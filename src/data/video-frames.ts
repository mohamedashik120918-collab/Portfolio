export const TOTAL_FRAMES = 400;

export const FRAME_PATHS: string[] = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/assets/enhanced-frames/frame_${String(i).padStart(5, "0")}.jpg`
);

export default FRAME_PATHS;
