import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';
createInertiaApp({
    resolve: (name) => import(`./Pages/${name}.tsx`), 
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
