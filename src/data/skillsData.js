// Technical skills only — spoken languages intentionally excluded per request.
// Grouped to match the shomeswaran.xyz-style layout: one horizontal ticker
// row per category, each item an icon card. Icons come from react-icons,
// which was already a dependency in this project. Each skill carries its
// real brand color so the row reads as colorful, not monochrome.

import {
  SiJavascript, SiPhp, SiCplusplus, SiPython, SiDart,
  SiReact, SiNodedotjs, SiExpress, SiLaravel, SiHtml5, SiCss, SiFlutter,
  SiMysql, SiFirebase, SiSupabase,
  SiGit, SiGithub, SiPostman, SiAndroidstudio, SiFigma,
} from 'react-icons/si';
import { FaJava, FaMicrosoft, FaCode, FaPalette } from 'react-icons/fa';

export const skillGroups = [
  {
    label: 'languages',
    items: [
      { name: 'Java', icon: FaJava, color: '#f89820' },
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
      { name: 'PHP', icon: SiPhp, color: '#777bb4' },
      { name: 'C++', icon: SiCplusplus, color: '#00599c' },
      { name: 'SQL', icon: SiMysql, color: '#4479a1' },
      { name: 'Python', icon: SiPython, color: '#3776ab' },
      { name: 'Dart', icon: SiDart, color: '#0175c2' },
    ],
  },
  {
    label: 'frameworks & technologies',
    items: [
      { name: 'React.js', icon: SiReact, color: '#61dafb' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#3c873a' },
      { name: 'Express.js', icon: SiExpress, color: '#8f8f8f' },
      { name: 'Laravel', icon: SiLaravel, color: '#ff2d20' },
      { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
      { name: 'CSS3', icon: SiCss, color: '#2965f1' },
      { name: 'Flutter', icon: SiFlutter, color: '#02569b' },
    ],
  },
  {
    label: 'databases & cloud',
    items: [
      { name: 'MySQL', icon: SiMysql, color: '#4479a1' },
      { name: 'Firebase Firestore', icon: SiFirebase, color: '#ffca28' },
      { name: 'Firebase Auth', icon: SiFirebase, color: '#ffca28' },
      { name: 'Supabase', icon: SiSupabase, color: '#3ecf8e' },
    ],
  },
  {
    label: 'tools',
    items: [
      { name: 'Git', icon: SiGit, color: '#f05032' },
      { name: 'GitHub', icon: SiGithub, color: '#8f8f8f' },
      { name: 'VS Code', icon: FaCode, color: '#007acc' },
      { name: 'Postman', icon: SiPostman, color: '#ff6c37' },
      { name: 'Android Studio', icon: SiAndroidstudio, color: '#3ddc84' },
      { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
      { name: 'Canva', icon: FaPalette, color: '#00c4cc' },
      { name: 'Microsoft Office', icon: FaMicrosoft, color: '#d83b01' },
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.items.map((i) => i.name));
