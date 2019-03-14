// This is in a separate file than the AutoExampleWrapper because it is consumed by e2e test which is Node code not browser code.

export function createAutoExampleProps(autoExampleProps) {
  // We might add here also dark background
  const { rtl } = autoExampleProps;
  return {
    autoExample__rtl: rtl,
  };
}
