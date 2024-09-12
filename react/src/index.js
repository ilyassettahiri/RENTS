

import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { createMongoAbility } from "@casl/ability";


import App from "App";
import { I18nProvider } from 'locales/i18n-provider'; 
// Soft UI Context Provider
import { SoftUIControllerProvider, AuthContextProvider } from "context";
import { AbilityContext } from "Can";

const rootElement = document.getElementById("root");
const ability = new createMongoAbility();
import { TextDirectionProvider } from "context/useTextDirection";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

  <AbilityContext.Provider value={ability}>

    <I18nProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <SoftUIControllerProvider>
            
            <TextDirectionProvider> 

              <App ability={ability} />
            </TextDirectionProvider>

          </SoftUIControllerProvider>
        </AuthContextProvider>

      </BrowserRouter>
    </I18nProvider>
  </AbilityContext.Provider>


);
