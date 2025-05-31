import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpManager } from '../xprikryl-vp-manager';
import { XprikrylVpLogin } from '../../xprikryl-vp-login/xprikryl-vp-login';
import { XprikrylVpList } from '../../xprikryl-vp-list/xprikryl-vp-list';
import { XprikrylVpCreate } from '../../xprikryl-vp-create/xprikryl-vp-create';

describe('xprikryl-vp-manager', () => {
  it('renders login component on root URL', async () => {
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/ambulance-virtual-patient/' },
      writable: true
    });

    const page = await newSpecPage({
      components: [XprikrylVpManager, XprikrylVpLogin],
      html: `<xprikryl-vp-manager base-path="/ambulance-virtual-patient/"></xprikryl-vp-manager>`,
    });

    const loginComponent = page.root.shadowRoot.querySelector('xprikryl-vp-login');
    expect(loginComponent).toBeTruthy();
  });

  it('renders list component on /list URL', async () => {
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/ambulance-virtual-patient/list' },
      writable: true
    });

    const page = await newSpecPage({
      components: [XprikrylVpManager, XprikrylVpList],
      html: `<xprikryl-vp-manager base-path="/ambulance-virtual-patient/"></xprikryl-vp-manager>`,
    });

    const listComponent = page.root.shadowRoot.querySelector('xprikryl-vp-list');
    expect(listComponent).toBeTruthy();
  });

  it('renders the create form on /create URL', async () => {

    // Mock the window location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/ambulance-virtual-patient/create' },
      writable: true,
    });

    const page = await newSpecPage({
      components: [XprikrylVpManager, XprikrylVpList, XprikrylVpCreate],
      html: `<xprikryl-vp-manager base-path="/ambulance-virtual-patient/"></xprikryl-vp-manager>`,
    });
    
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('xprikryl-vp-create')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('xprikryl-vp-list')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('xprikryl-vp-login')).toBeFalsy();
  });

  it('renders the back button on /create URL', async () => {
    
    // Mock the window location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/ambulance-virtual-patient/create' },
      writable: true,
    });

    const page = await newSpecPage({
      components: [XprikrylVpManager, XprikrylVpList, XprikrylVpCreate],
      html: `<xprikryl-vp-manager base-path="/ambulance-virtual-patient/"></xprikryl-vp-manager>`,
    });

    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.back-button')).toBeTruthy();
  });

  it('renders the back button on /list URL', async () => {
    
    // Mock the window location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/ambulance-virtual-patient/create' },
      writable: true,
    });

    const page = await newSpecPage({
      components: [XprikrylVpManager, XprikrylVpList, XprikrylVpCreate],
      html: `<xprikryl-vp-manager base-path="/ambulance-virtual-patient/"></xprikryl-vp-manager>`,
    });

    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.back-button')).toBeTruthy();
  });

  it('does not render the back button on / URL', async () => {
    
    // Mock the window location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/ambulance-virtual-patient/' },
      writable: true,
    });

    const page = await newSpecPage({
      components: [XprikrylVpManager, XprikrylVpList, XprikrylVpCreate],
      html: `<xprikryl-vp-manager base-path="/ambulance-virtual-patient/"></xprikryl-vp-manager>`,
    });

    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.back-button')).toBeFalsy();
  });
});
