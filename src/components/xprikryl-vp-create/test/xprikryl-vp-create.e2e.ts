import { newE2EPage } from '@stencil/core/testing';

describe('xprikryl-vp-create', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xprikryl-vp-create></xprikryl-vp-create>');

    const element = await page.find('xprikryl-vp-create');
    expect(element).toHaveClass('hydrated');
  });
});
