varying vec3 vertexNormal;

void main() {

    float intensity = pow( 0.7 - dot( vertexNormal, vec3(0, 0, 1.0)), 9.0 ); // 10.0 at end is usually 2.0
  
    gl_FragColor = vec4( 216.0/255.0, 134.0/255.0, 80.0/255.0, 1.0 ) * intensity;
    // gl_FragColor = vec4( 229.0/255.0, 56.0/255.0, 59.0/255.0, 1.0 ) * intensity;

}