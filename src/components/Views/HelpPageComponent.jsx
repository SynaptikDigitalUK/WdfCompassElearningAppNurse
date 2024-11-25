
import SectionTitleBtn from '../SectionTitleBtn'
import CacheLibrary from '../CacheLibrary/CacheLibrary'

export default function HelpPageComponent() {

  return (
    <>
      <div className="content-wrapper">
        <div className="container container-help-content">
          <SectionTitleBtn title='HELP' link='' active={false}></SectionTitleBtn>
          <h1>Download instructions</h1>


          <p>To continue accessing this learning resource while disconnected from the internet, you can install the application on your device.</p>
           
            <div className='topic-question-callout'>
            <p><strong>IMPORTANT:</strong> The app is 350MB. We recommend installing the app when you have a stable WiFi connection.</p>
            <p className='my-2'>Please follow these steps to ensure the app can be used offline</p>
            <ol>
              <li>Add the app to the device homepage (see Android and iOS install instructions below)</li>
              <li>Before you open the installed app from device homepage, close the browser version of the app </li>
              <li>Open the app from the icon installed on your device homepage</li>
              <li>Within the installed app, open the “Instructions for offline” page. Under “Cache details” wait for the progress bar to indicate “Ready to use offline”</li>
              <li>The app can then be used offline</li>
            </ol>
            </div>



            <h2>Android</h2>
            <p>On most devices you will see an  <strong>Install</strong> button. Tap this button to install the app.</p>
            <p>If you do not see an install button:</p>
            <p><strong>Install</strong></p>
            <ol>
              <li>Open the site in Chrome <i><img className='fa-icon' src="/assets/chrome.svg"/></i></li>
              <li>Tap on the menu icon in the browser <i><img className='fa-icon' src="/assets/android-menu-icon.svg"/></i></li>
              <li>Tap <strong>Install app</strong> or <strong>Add to Home Screen</strong></li>
              <li>Follow on-screen instructions<br />
              <strong> Important:</strong> before opening the installed version, please close the browser version</li>
            </ol>

            <p><strong>Uninstall</strong></p>
            <ol>
              <li>Press and hold the app icon on your home screen</li>
              <li>Select <strong>Uninstall</strong> </li>
              <li>Follow on screen instructions</li>
            </ol>


            <h2 className='mt-5'>iOS</h2>
            <p><strong>Install</strong></p>
            <ol>
              <li>Open the site in Safari <i><img className='fa-icon' src="/assets/safari.svg"/></i></li>
              <li>Tap the share button <i><img className='fa-icon' src="/assets/arrow-up-from-bracket.svg"/></i></li>
              <li>Select <strong>Add to Home Screen</strong></li>
              <li>Tap <strong>Add</strong></li>
              <li>Follow on-screen instructions<br />
              <strong> Important:</strong> before opening the installed version, please close the browser version</li>
            </ol>
 
            <p><strong>Uninstall</strong></p>
            <ol>
              <li>Press and hold the app icon on your home screen</li>
              <li>Select <strong>Delete bookmark</strong></li>
            </ol>


            <h2 className='mt-5'>Desktop/Laptop</h2>
            <p><strong>Install</strong></p>
            <ol>
              <li>Open the site in Chrome</li>
              <li>Click on the three vertical dots at top right of the open Chrome window <i><img className='fa-icon' src="/assets/android-menu-icon.svg"/></i></li>
              <li>Click <strong>Save and share</strong>  <i><img className='fa-icon' src="/assets/file-save-share.svg"/></i></li>
              <li>Click <strong>Install Compass elearning</strong></li>
            </ol>
 
            <p><strong>Uninstall</strong></p>
            <ol>
              <li>Go to System settings &#62; Apps & Features</li>
              <li>Click on the menu icon</li>
              <li>Click <strong>Uninstall</strong></li>
            </ol>

         

            <h2 className='mt-5'>Cache Details</h2>
            <CacheLibrary />
            
        </div>
      </div>
    </>
  );
}
