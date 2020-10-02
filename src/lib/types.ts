export type ConfigItems = {
  apiToken: string;
  customBranches: string[];
  autoLoadWorkflows: boolean;
  autoLoadWorkflowJobs: boolean;
  pipelineReloadInterval: number;
  workflowReloadInterval: number;
  VCSProvider: 'github' | 'bitbucket';
};

export type GitSet = {
  user: string;
  repo: string;
  branch: string;
};

export type ActivatableGitSet = GitSet & {
  current: boolean;
};

export type Asset = {
  light: string;
  dark: string;
};
