import withConditionalWrapper from '@/components/hoc/withConditionalWrapper';
import React, { useEffect } from 'react';

const SocialEmbed = ({ htmlText }) => {
  useEffect(() => {
    const loadTwitterScript = () => {
      if (!window.twttr) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.onload = () => {
          if (window.twttr) {
            window.twttr.widgets.load();
          }
        };
        document.body.appendChild(script);
      } else {
        window.twttr.widgets.load();
      }
    };

    const loadInstagramScript = () => {
      if (!window.instgrm) {
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        script.onload = () => {
          // console.log('Instagram script loaded');
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        };
        document.body.appendChild(script);
      } else {
        window.instgrm.Embeds.process();
      }
    };

    loadTwitterScript();
    loadInstagramScript();

    // Attach scroll event listeners if required
    if (typeof window !== 'undefined') {
      document.addEventListener(
        'scroll',
        () => {
          if (window.twttr) {
            window.twttr.widgets.load();
          }
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        },
        { once: true }
      );
    }
  }, []);

  return (
    <div
      className="fb-video"
      dangerouslySetInnerHTML={{ __html: htmlText }}
    />
  );
};

export default withConditionalWrapper(SocialEmbed);
