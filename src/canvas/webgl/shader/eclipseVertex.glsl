varying vec3 vertexNormal;

void main() {

    vertexNormal = normalize(normalMatrix * normal);
    vec4 modelViewPosition = modelViewMatrix * vec4( position, 1.0 );

    gl_Position = ( projectionMatrix * modelViewPosition );
}