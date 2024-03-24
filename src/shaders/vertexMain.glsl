vec3 coords = normal;
coords.y += uTime;
coords += cnoise(coords / 1.5);
float pattern = wave(coords);

vDisplacement = pattern;

float displacement = vDisplacement / 3.;

transformed += normalize(objectNormal) * displacement;