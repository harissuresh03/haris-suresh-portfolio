import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, revealProps } from '../lib/animations';
import { skillGroups } from '../data/skillsData';

// One infinite horizontal ticker row per category, icon-card style, ghost
// numeral watermark per row — matches the shomeswaran.xyz skills layout.
// Deliberately no hover-pause anywhere in here per the brief.
const SkillRow = ({ group, index }) => {
  const loop = [...group.items, ...group.items];
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div variants={fadeUp} {...revealProps} className="skill-row">
      <div className="skill-row-header">
        <span className="skill-row-label mono">{group.label}</span>
        <span className="skill-row-ghost-num">{num}</span>
      </div>

      <div className="skill-row-track-wrap">
        <div className="skill-row-track" style={{ animationDuration: `${group.items.length * 4.5}s` }}>
          {loop.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <div
                className="skill-card"
                key={i}
                style={{
                  '--skill-color': skill.color,
                }}
              >
                <span className="skill-card-icon" style={{ background: `${skill.color}22`, color: skill.color }}>
                  <Icon />
                </span>
                <span className="skill-card-name">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const SkillsTicker = () => {
  return (
    <section id="skills" className="skills-section" aria-label="Technical skills">
      <div className="container">
        <motion.div variants={fadeUp} {...revealProps}>
          <p className="section-eyebrow">skills</p>
          <h2 className="section-title">Technical toolkit</h2>
        </motion.div>

        <div className="skills-rows">
          {skillGroups.map((group, i) => (
            <SkillRow group={group} index={i} key={group.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsTicker;
