import { newE2EPage } from '@stencil/core/testing';

describe('xprikryl-vp-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xprikryl-vp-list></xprikryl-vp-list>');

    const element = await page.find('xprikryl-vp-list');
    expect(element).toHaveClass('hydrated');
  });
});