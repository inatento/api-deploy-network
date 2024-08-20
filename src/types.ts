export interface servCfgInt {
  readFile: (filePath: string) => Promise<string>
}

export interface HostsContent {
  ansible_host: string
  ansible_user: string
}

export interface Hosts {
  orgs?: {
    hosts: {
      [key: string]: HostsContent
    }
  }
  cas?: {
    hosts: {
      [key: string]: HostsContent
    }
  }
}

export interface ContentPayload {
  content: Hosts
}

export interface AnsibleFact {
  discovered_interpreter_python: string
}

export interface PingResponse {
  ansible_facts: AnsibleFact
  changed: boolean
  ping: string
}
