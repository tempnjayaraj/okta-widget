import React, { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import './gobal.css';
import config from './config';

const OktaSignInWidget = ({ onSuccess, onError }) => {
  const widgetRef = useRef();
  useEffect(() => {
    if (!widgetRef.current) {
      return false;
    }

    
    const widget = new OktaSignIn(config.widget);

   // Search for URL Parameters to see if a user is being routed to the application to recover password
   var searchParams = new URL(window.location.href).searchParams;
   widget.otp = searchParams.get('otp');
   widget.state = searchParams.get('state');
   widget.showSignInToGetTokens({
      el: widgetRef.current,
    }).then(onSuccess).catch(onError);

    return () => widget.remove();
  }, [onSuccess, onError]);

  return (<div id="myModal" class="modal">
    <link
    href="https://ok1static.oktacdn.com/assets/js/sdk/okta-signin-widget/3.0.0/css/okta-sign-in.min.css"
    type="text/css"
    rel="stylesheet"/>

  <div class="modal-content" ref={widgetRef} >
  <span class="close" onClick={()=>{
    var modal = document.getElementById("myModal");
      modal.style.display = "none"
      }}>&times;</span>
  
  </div>
  </div>
  
  
  );
};

export default OktaSignInWidget;