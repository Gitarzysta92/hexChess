export default `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif

precision highp float;
precision highp int;
#define HIGH_PRECISION
#define SHADER_NAME ShaderMaterial

#define GLSLIFY 1
uniform sampler2D _MainTexture;
uniform vec3 _Color;
varying vec2 vUv;
varying vec3 vWPos;

uniform float _Opacity;
uniform float _CameraFadeout;
varying float vDistanceToPlanet;
varying float vDistanceToCamera;
// varying float vDistanceToMouse;


vec3 SRGBtoLinear(vec3 srgb) {
    vec3 linOut = pow(srgb.xyz, vec3(2.2));
    return vec3(linOut);
}
vec3 linearToSRGB(vec3 color) {
    return pow(color, vec3(1.0 / 2.2));
}

void main() {
  vec2 uv = vUv*2.0-vec2(1.0);
  float strength = exp(-5.0*saturate(length(uv)));

  vec3 col = texture2D(_MainTexture, vUv).rgb;
  // col = SRGBtoLinear(col);
  // planet_mask *= 1.0-exp(-(vDistanceToCamera-2.0));

  gl_FragColor = vec4(_Color, col.r);
  //  gl_FragColor.a = linearToSRGB(vec3(gl_FragColor.a)).r ;
  // gl_FragColor.rgb = vec3(vDistanceToMouse);
  // gl_FragColor.rgb = vec3(1.0-exp(-(vDistanceToCamera-1.0)));
  // gl_FragColor = vec4(1.);
  // gl_FragColor.a = 1.0;
  // gl_FragColor.rgb *= planet_mask;
  // gl_FragColor.a = 1.0;
  // gl_FragColor.rgb = vec3(vUv, 0.0);

  #if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	  gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
  #endif
}`