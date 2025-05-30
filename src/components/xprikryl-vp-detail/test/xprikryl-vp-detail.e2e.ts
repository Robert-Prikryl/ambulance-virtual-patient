import { newE2EPage } from '@stencil/core/testing';

describe('xprikryl-vp-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xprikryl-vp-detail></xprikryl-vp-detail>');

    const element = await page.find('xprikryl-vp-detail');
    expect(element).toHaveClass('hydrated');
  });
});
