import { Component, Host, Prop, State, h, Listen } from '@stencil/core';

// Add Navigation API type definitions
declare global {
  interface Window {
    navigation?: {
      navigate: (url: string) => void;
      addEventListener: (type: string, listener: (ev: Event) => void) => void;
    };
  }
}

@Component({
  tag: 'xprikryl-vp-manager',
  styleUrl: 'xprikryl-vp-manager.css',
  shadow: true,
})
export class XprikrylVpManager {
  @Prop() apiBase: string;
  @Prop() basePath: string;
  @State() userRole: string | null = null;
  @State() relativePath: string = '';

  componentWillLoad() {
    // Load user role from localStorage if it exists
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      this.userRole = savedRole;
    }

    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length);
      } else {
        this.relativePath = "";
      }
    };

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname);
  }

  @Listen('popstate', { target: 'window' })
  handlePopState() {
    this.handleUrlChange();
  }

  private navigate(path: string) {
    const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
    window.navigation?.navigate(absolute);
  }

  private handleBackClick() {
    if (this.relativePath === 'list') {
      // Special case: when on list view, go back to root
      const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;
      window.navigation?.navigate(baseUri);
    } else {
      // Normal case: use browser's back navigation
      window.history.back();
    }
  }

  private handleUrlChange() {
    if (this.relativePath === '/' || this.relativePath === '') {
      // Root path - show login if no role selected
      if (this.userRole && this.relativePath !== '/') {
        this.navigate('./list');
      }
    }
  }

  private handleEntryClick(event: CustomEvent<string>) {
    const id = event.detail;
    if (id === "@new") {
      this.navigate('./create');
    } else {
      this.navigate(`./patient/${id}`);
    }
  }

  private handleRoleSelected(event: CustomEvent<string>) {
    this.userRole = event.detail;
    // Save role to localStorage
    localStorage.setItem('userRole', event.detail);
    this.navigate('./list');
  }

  private handlePatientUpdated() {
    this.navigate('./list');
  }

  private handlePatientDeleted() {
    this.navigate('./list');
  }

  render() {
    // Show login if no role selected
    if (this.relativePath === '/' || this.relativePath === '') {
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
    if (this.relativePath === 'list') {
      return (
        <Host>
          <md-filled-button 
            class="back-button"
            onClick={() => this.handleBackClick()}>
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
    if (this.relativePath === 'create') {
      return (
        <Host>
          <md-filled-button 
            class="back-button"
            onClick={() => window.history.back()}>
            <md-icon slot="icon">arrow_back</md-icon>
            Back
          </md-filled-button>
          <xprikryl-vp-create 
            api-base={this.apiBase}
            onPatient-created={() => this.handlePatientUpdated()}>
          </xprikryl-vp-create>
        </Host>
      );
    }

    // Show patient detail/editor based on role
    if (this.relativePath.includes('patient/')) {
      const patientId = this.relativePath.split('patient/')[1];
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
              user-role={this.userRole}
              onPatient-updated={() => this.handlePatientUpdated()}
              onPatient-deleted={() => this.handlePatientDeleted()}>
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
  }
}
