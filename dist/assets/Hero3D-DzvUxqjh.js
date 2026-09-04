import{j as e,C as M,b as a,u as E,c as j,d as y,V as v}from"./three-BTHvzbUQ.js";import{g as p}from"./gsap-CzGW6FVa.js";import{S as C}from"./index-BHdz_4HZ.js";import"./react-B6QAK72s.js";import"./motion-xZyMmqH1.js";import"./animejs-CIZFrbXV.js";p.registerPlugin(C);const D=`
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vec3 pos = position;
  float d = 0.34
    + 0.22 * sin(pos.y * 2.2 + uTime * 1.4)
    + 0.18 * sin(pos.x * 1.8 + uTime * 1.1) * cos(pos.z * 1.6 + uTime * 0.9);
  pos += normal * d;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vViewDir = normalize(-mv.xyz);
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}
`,R=`
uniform vec3 uColor;
uniform vec3 uEmissive;
uniform float uEmissiveIntensity;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vec3 lightDir = normalize(vec3(0.6, 0.8, 0.5));
  float dif = max(dot(vNormal, lightDir), 0.0);
  vec3 base = uColor * (0.3 + dif * 0.9);
  float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDir))), 2.2);
  vec3 glow = uEmissive * (uEmissiveIntensity + fresnel * 1.6);
  vec3 col = base + glow;
  gl_FragColor = vec4(col, 1.0);
}
`;function w({color:i,emissive:t,intensity:o,segments:n,scale:r=1}){const s=a.useRef(null),l=a.useRef(null),d=a.useMemo(()=>1+Math.random(),[]);return E(u=>{const m=u.clock.elapsedTime;s.current&&(s.current.uniforms.uTime.value=m),l.current&&(l.current.position.y=Math.sin(m*.6+d)*.25)}),e.jsx("group",{ref:l,scale:r,children:e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1.45,n,n]}),e.jsx("shaderMaterial",{ref:s,uniforms:{uTime:{value:0},uColor:{value:new j(i)},uEmissive:{value:new j(t)},uEmissiveIntensity:{value:o}},vertexShader:D,fragmentShader:R})]})})}function T({a:i,b:t,mid:o,len:n}){const r=a.useRef(null);return a.useLayoutEffect(()=>{if(!r.current)return;const s=new v().subVectors(t,i).normalize();r.current.quaternion.setFromUnitVectors(new v(0,1,0),s)},[i,t]),e.jsxs("mesh",{ref:r,position:o,children:[e.jsx("cylinderGeometry",{args:[.035,.035,n,6]}),e.jsx("meshStandardMaterial",{color:"#34D399",emissive:"#047857",emissiveIntensity:.6,metalness:.2,roughness:.35})]})}function V(){const{curveA:i,curveB:t,rungPairs:o}=a.useMemo(()=>{const u=[],m=[];for(let c=0;c<=140;c++){const g=c/140,x=(g-.5)*6.6,f=g*Math.PI*2*2.6;u.push(new v(Math.cos(f)*1.05,x,Math.sin(f)*1.05)),m.push(new v(-Math.cos(f)*1.05,x,-Math.sin(f)*1.05))}const h=[];for(let c=0;c<=140;c+=8)h.push([u[c],m[c]]);return{curveA:new y(u),curveB:new y(m),rungPairs:h}},[]),n=r=>e.jsxs("mesh",{children:[e.jsx("tubeGeometry",{args:[r,60,.055,8]}),e.jsx("meshStandardMaterial",{color:"#22D3EE",emissive:"#0891B2",emissiveIntensity:.7,metalness:.3,roughness:.3})]});return e.jsxs("group",{children:[n(i),n(t),o.map(([r,s],l)=>{const d=new v().addVectors(r,s).multiplyScalar(.5),u=r.distanceTo(s)*.92;return e.jsx(T,{a:r,b:s,mid:d,len:u},l)})]})}function S(){const i=a.useRef(null),t=a.useRef(null);return E((o,n)=>{t.current&&(t.current.rotation.y+=n*.1)}),a.useEffect(()=>{const o=i.current;if(!o)return;const n=window.matchMedia("(hover: hover) and (pointer: fine)").matches,r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!n||r)return;const s=p.context(()=>{p.to(o.position,{y:-.9,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}})});return()=>s.revert()},[]),e.jsx("group",{ref:i,children:e.jsxs("group",{ref:t,children:[e.jsx(w,{color:"#10B981",emissive:"#06B6D4",intensity:1.1,segments:72}),e.jsx(w,{color:"#34D399",emissive:"#22D3EE",intensity:1.5,segments:40,scale:.42}),e.jsx(V,{})]})})}function B(){return e.jsx("div",{className:"hero-3d","aria-hidden":"true",children:e.jsxs(M,{dpr:[1,1.5],camera:{position:[0,0,8],fov:45},gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},children:[e.jsx("ambientLight",{intensity:.6}),e.jsx("directionalLight",{position:[5,8,5],intensity:1.1}),e.jsx(S,{})]})})}export{B as default};
