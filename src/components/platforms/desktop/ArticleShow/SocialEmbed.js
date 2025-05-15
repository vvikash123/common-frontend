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
          console.log('Twitter script loaded');
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

    const loadFacebookScript = () => {
      if (!window.FB) {
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log('Facebook script loaded');
          if (window.FB) {
            window.FB.XFBML.parse();
          }
        };
        document.body.appendChild(script);
      } else {
        window.FB.XFBML.parse();
      }
    };

    loadTwitterScript();
    loadInstagramScript();
    loadFacebookScript();

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
          if (window.FB) {
            window.FB.XFBML.parse();
          }
        },
        { once: true }
      );
    }
  }, []);

  return (
    <div
      className="social-embed-container"
      dangerouslySetInnerHTML={{ __html: htmlText }}
    />
  );
};

export default withConditionalWrapper(SocialEmbed);
