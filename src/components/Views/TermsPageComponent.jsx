
import SectionTitleBtn from '../SectionTitleBtn'

export default function TermsPageComponent() {

  return (
    <>
      <div className="content-wrapper">
        <div className="container container-terms-content">
          <SectionTitleBtn title='Terms and conditions' link='' active={false}></SectionTitleBtn>

          <h2>Terms and conditions for country / organisation that wish to reuse and customise the app:</h2>
          <p>By downloading the Compass Learning Application, you - as user of the Application - agree to accept the terms of use, copyright notice and the disclaimers here below:</p>
          <p>The Compass Learning Application is created as a tool to facilitate the implementation of essential Diabetes Management and Hypertension Management for primary health care. The Application is intended to be used by health care providers and not by patients.</p>
          <p>Under this license, you are allowed to copy, redistribute, and adapt the content in this Application for non-commercial purposes, if you appropriately cite the work. However, you must not imply that the World Diabetes Foundation (WDF) endorses any specific organization, products, or services, and the use of the WDF logo is prohibited. If you adapt the work, you must license your work under the same or an equivalent Creative Commons license. For translations of this work, a disclaimer must be added along with the suggested citation: “This translation was not authored by the World Diabetes Foundation (WDF). WDF bears no responsibility for the content or accuracy of this translation. The original English edition shall remain the authoritative and authentic edition”.</p>
          <p>This app has been developed by the WDF, in partnership with International Medical Press (IMP). WDF has taken reasonable precautions to verify the information, but the material is distributed without any warranties. Users are responsible for interpreting and using the material, and WDF is not liable for any damages arising from its use. If you wish to reuse third-party material from this Application, such as tables, figures, or images, it is your responsibility to determine and obtain any necessary permissions. The WDF and their partners shall not be held liable for any damages arising from the use of the material.</p>
            
        </div>
      </div>
    </>
  );
}
