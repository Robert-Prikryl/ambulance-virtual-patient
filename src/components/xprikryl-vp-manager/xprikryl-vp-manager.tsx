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

  componentWillLoad() {
    // Check URL on initial load
    this.handleUrlChange();
  }

  @Listen('popstate', { target: 'window' })
  handlePopState() {
    this.handleUrlChange();
  }

  private handleUrlChange() {
    const path = window.location.pathname;
    if (path.includes('/create')) {
      this.showCreateForm = true;
      this.selectedPatientId = null;
    } else if (path.includes('/patient/')) {
      const id = path.split('/patient/')[1];
      this.showCreateForm = false;
      this.selectedPatientId = id;
    } else {
      this.showCreateForm = false;
      this.selectedPatientId = null;
    }
  }

  private handleEntryClick(id: string) {
    if (id === "@new") {
      this.showCreateForm = true;
      this.selectedPatientId = null;
      window.history.pushState({}, '', '/create');
    } else {
      this.showCreateForm = false;
      this.selectedPatientId = id;
      window.history.pushState({}, '', `/patient/${id}`);
    }
  }

  private handlePatientCreated() {
    this.showCreateForm = false;
    this.selectedPatientId = null;
    window.history.pushState({}, '', '/');
  }

  private handleBack() {
    window.history.back();
  }

  render() {
    return (
      <Host>
        {this.showCreateForm && (
          <md-filled-button 
            class="back-button"
            onClick={() => this.handleBack()}>
            <md-icon slot="icon">arrow_back</md-icon>
            Back
          </md-filled-button>
        )}
        {!this.showCreateForm ? (
          <xprikryl-vp-list 
            api-base={this.apiBase}
            onEntry-clicked={(event) => this.handleEntryClick(event.detail)}>
          </xprikryl-vp-list>
        ) : (
          <xprikryl-vp-create 
            api-base={this.apiBase}
            onPatient-created={() => this.handlePatientCreated()}>
          </xprikryl-vp-create>
        )}
      </Host>
    );
  }
}
