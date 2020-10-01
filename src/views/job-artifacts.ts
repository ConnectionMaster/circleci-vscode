import { JobArtifact as JobArtifactData } from 'circle-client';
import { TreeItemCollapsibleState } from 'vscode';
import CircleCITree from '../lib/circleci-tree';
import { getAsset, localize } from '../lib/utils';
import Job from './job';
import JobArtifact from './job-artifact';
import ResourcesItem from './resources-item';

export default class JobArtifacts extends ResourcesItem {
  readonly contextValue = 'circleciJobArtifacts';

  constructor(readonly job: Job, readonly tree: CircleCITree) {
    super(
      localize('circleci.lookUpArtifacts', 'Look up Artifacts →'),
      TreeItemCollapsibleState.None,
      localize('circleci.artifactPlural', 'Artifacts'),
      false,
      tree
    );

    this.command = {
      command: 'circleci.fetchJobArtifacts',
      title: localize('circleci.fetchArtifacts', 'Fetch Artifacts'),
      arguments: [this],
    };

    this.iconPath = getAsset(this.tree.context, 'box');
    this.setup(
      this.job.workflow.pipeline.refresh.bind(this.job.workflow.pipeline)
    );
  }

  updateResources(): void {
    this.command = undefined;
    this.collapsibleState = TreeItemCollapsibleState.Expanded;
    this.job.workflow.pipeline.refresh();

    this.loadResources<JobArtifactData>(async () => {
      return this.tree.client.listJobArtifacts(this.job.job.job_number!);
    }).then((newArtifacts) => {
      this.mainRows.push(
        ...newArtifacts.map(
          (artifact) => new JobArtifact(artifact, this.job, this.tree)
        )
      );
      this.label = this.label = localize(
        'circleci.viewArtifacts',
        'View Artifacts'
      );
      this.didUpdate();
    });
  }
}
