import React, {useEffect, useState} from 'react';
import { AiFillEye, AiOutlineLink} from 'react-icons/ai';
import { motion } from 'framer-motion';

import {AppWrap, MotionWrap} from '../../wrapper';
import { urlFor, client } from '../../client';

import './Work.scss';

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h2 className='head-text'>
        My creative <span>Porfolio </span>
      <div className='app__work-filter'>
        {['Embedded App', 'Web App', 'Mobile App', 'Photography', 'Aerial Photography', 'All'].map((item, index) => (
          <div 
            key={index} 
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}>
              {item}
          </div>
        ))}
      </div>
      </h2>
      <motion.div
        animate={animateCard}
        transition={{duration: 0.5, delayChildren: 0.5}}
        className='app__work-portfolio'
        >
          {filterWork.map((work, index) => (
            <div key={index} className='app__work-item app__flex'>
              <div className='app__work-img app__flex'>
                {work.imgUrl ? <img src={urlFor(work.imgUrl)} alt={work.name} /> : <div></div>}
                <motion.div
                  whileHover={{opacity: [0, 1]}}
                  transition={{duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5}}
                  className='app__work-hover app__flex'>
                  <a href={work.projectLink} target='_blank' rel='noreferrer'>
                    <motion.div
                    whileInView={{scale: [0, 1]}}
                    whileHover={{scale: [1, 0.9]}}
                    transition={{duration: 0.25}}
                    className='app__flex'>
                      <AiFillEye/>
                    </motion.div>
                  </a>
                  <a href={work.codeLink} target='_blank' rel='noreferrer'>
                    <motion.div
                    whileInView={{scale: [0, 1]}}
                    whileHover={{scale: [1, 0.9]}}
                    transition={{duration: 0.25}}
                    className='app__flex'>
                      <AiOutlineLink/>
                    </motion.div>
                  </a>
                </motion.div>
              </div>
              <div
                className='app__work-content app__flex'
              >
                <h4 className='bold-text'>{work.title}</h4>
                <h5 className='italic-text'>{work.company}</h5>
                <p className='p-text' style={{marginTop: 10}}>{work.description}</p>
                <div className='app__work-tag app_flex'>
                  <p className='p-text'>{work.tags[0]}</p>
                </div>
              </div>
            </div>
          ))}
      </motion.div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);