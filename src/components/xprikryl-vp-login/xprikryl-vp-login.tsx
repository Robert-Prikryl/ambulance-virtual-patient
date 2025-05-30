import { Component, Host, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'xprikryl-vp-login',
  styleUrl: 'xprikryl-vp-login.css',
  shadow: true,
})
export class XprikrylVpLogin {
  @Prop() apiBase: string;
  @Event() roleSelected: EventEmitter<string>;

  private handleRoleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.roleSelected.emit(select.value);
  }

  render() {
    return (
      <Host>
        <div class="login-container">
          <h2>Select your role</h2>
          <md-filled-select onchange={(e) => this.handleRoleChange(e)}>
            <md-select-option value="student">Student</md-select-option>
            <md-select-option value="teacher">Teacher</md-select-option>
          </md-filled-select>
        </div>
      </Host>
    );
  }
}
