import { Component, Host, Prop, State, h, Listen } from '@stencil/core';

@Component({
  tag: 'xprikryl-vp-manager',
  styleUrl: 'xprikryl-vp-manager.css',
  shadow: true,
})
export class XprikrylVpManager {
  @Prop() apiBase: string;
  @State() userRole: string | null = null;

  componentWillLoad() {
    // Load user role from localStorage if it exists
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      this.userRole = savedRole;
    }
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
    }
  }

  private handleEntryClick(event: CustomEvent<string>) {
    const id = event.detail;
    if (id === "@new") {
      window.location.href = '/create';
    } else {
      window.location.href = `/patient/${id}`;
    }
  }

  private handleRoleSelected(event: CustomEvent<string>) {
    this.userRole = event.detail;
    // Save role to localStorage
    localStorage.setItem('userRole', event.detail);
    window.location.href = '/list';
  }

  render() {
    const path = window.location.pathname;

    // Show login if no role selected
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

    // Show list view
    if (path === '/list') {
      return (
        <Host>
          <md-filled-button 
            class="back-button"
            onClick={() => window.history.back()}>
            <md-icon slot="icon">arrow_back</md-icon>
            Back
          </md-filled-button>
          <xprikryl-vp-list 
            api-base={this.apiBase}
            userRole={this.userRole}
            onEntry-clicked={(e) => this.handleEntryClick(e)}>
          </xprikryl-vp-list>
        </Host>
      );
    }

    // Show create form
    if (path === '/create') {
      return (
        <Host>
          <md-filled-button 
            class="back-button"
            onClick={() => window.history.back()}>
            <md-icon slot="icon">arrow_back</md-icon>
            Back
          </md-filled-button>
          <xprikryl-vp-create 
            api-base={this.apiBase}>
          </xprikryl-vp-create>
        </Host>
      );
    }

    // Show patient detail/editor based on role
    if (path.includes('/patient/')) {
      const patientId = path.split('/patient/')[1];
      return (
        <Host>
          <md-filled-button 
            class="back-button"
            onClick={() => window.history.back()}>
            <md-icon slot="icon">arrow_back</md-icon>
            Back
          </md-filled-button>
          {this.userRole === 'teacher' ? (
            <xprikryl-vp-detail-editor
              api-base={this.apiBase}
              patient-id={patientId}
              user-role={this.userRole}>
            </xprikryl-vp-detail-editor>
          ) : (
            <xprikryl-vp-detail
              api-base={this.apiBase}
              patient-id={patientId}
              user-role={this.userRole}>
            </xprikryl-vp-detail>
          )}
        </Host>
      );
    }

    // Fallback to list view
    return (
      <Host>
        <xprikryl-vp-list 
          api-base={this.apiBase}
          userRole={this.userRole}
          onEntry-clicked={(e) => this.handleEntryClick(e)}>
        </xprikryl-vp-list>
      </Host>
    );
  }
}
