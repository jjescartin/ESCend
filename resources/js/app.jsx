import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import './../css/app.css'
createInertiaApp({
    resolve: (name) => import(`./Pages/${name}.jsx`), 
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
