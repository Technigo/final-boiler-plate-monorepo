export const fluidAnimationStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0.3,

  // pointerEvents: "none",
  // zIndex: 3,
};

export const animationConfig = {
  textureDownsample: 2,
  densityDissipation: 0.97,
  velocityDissipation: 0.99,
  pressureDissipation: 0.8,
  pressureIterations: 25,
  curl: 50,
  splatRadius: 0.003,
};
