import { Component, Host, Prop, State, h, Listen } from '@stencil/core';

@Component({
  tag: 'xprikryl-vp-manager',
  styleUrl: 'xprikryl-vp-manager.css',
  shadow: true,
})
export class XprikrylVpManager {
  @Prop() apiBase: string;
  @State() showCreateForm: boolean = false;
  @State() selectedPatientId: string | null = null;
  @State() userRole: string | null = null;

  componentWillLoad() {
    // Load user role from localStorage if it exists
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      this.userRole = savedRole;
    }
    // Check URL on initial load
    this.handleUrlChange();
  }

  @Listen('popstate', { target: 'window' })
  handlePopState() {
    this.handleUrlChange();
  }

  private handleUrlChange() {
    const path = window.location.pathname;
    if (path === '/' || path === '') {
      // Root path - show login if no role selected
      if (this.userRole && path !== '/') {
        window.location.href = '/list';
      }
    } else if (path === '/list') {
      // List path - show list view
      this.showCreateForm = false;
      this.selectedPatientId = null;
    } else if (path.includes('/create')) {
      this.showCreateForm = true;
      this.selectedPatientId = null;
    } else if (path.includes('/patient/')) {
      const id = path.split('/patient/')[1];
      this.showCreateForm = false;
      this.selectedPatientId = id;
    }
  }

  private handleEntryClick(id: string) {
    if (id === "@new") {
      this.showCreateForm = true;
      this.selectedPatientId = null;
      window.location.href = '/create';
    } else {
      this.showCreateForm = false;
      this.selectedPatientId = id;
      window.location.href = `/patient/${id}`;
    }
  }

  private handlePatientCreated() {
    this.showCreateForm = false;
    this.selectedPatientId = null;
    window.location.href = '/list';
  }

  private handleBack() {
    window.history.back();
  }

  private handleRoleSelected(event: CustomEvent<string>) {
    this.userRole = event.detail;
    // Save role to localStorage
    localStorage.setItem('userRole', event.detail);
    window.location.href = '/list';
  }

  render() {
    const path = window.location.pathname;
    if (path === '/' || path === '') {
      return (
        <Host>
          <xprikryl-vp-login 
            api-base={this.apiBase}
            onRoleSelected={(e) => this.handleRoleSelected(e)}>
          </xprikryl-vp-login>
        </Host>
      );
    }

    return (
      <Host>
        <md-filled-button 
          class="back-button"
          onClick={() => this.handleBack()}>
          <md-icon slot="icon">arrow_back</md-icon>
          Back
        </md-filled-button>
        {!this.showCreateForm && !this.selectedPatientId ? (
          <xprikryl-vp-list 
            api-base={this.apiBase}
            userRole={this.userRole}
            onEntry-clicked={(event) => this.handleEntryClick(event.detail)}>
          </xprikryl-vp-list>
        ) : this.showCreateForm ? (
          <xprikryl-vp-create 
            api-base={this.apiBase}
            onPatient-created={() => this.handlePatientCreated()}>
          </xprikryl-vp-create>
        ) : (
          <xprikryl-vp-detail
            api-base={this.apiBase}
            patient-id={this.selectedPatientId}
            user-role={this.userRole}>
          </xprikryl-vp-detail>
        )}
      </Host>
    );
  }
}
