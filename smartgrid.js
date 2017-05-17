var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'styl', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: "10px", /* gutter width px || % */
    container: {
        maxWidth: '1000px', /* max-width оn very large screen */
        fields: '10px' /* side fields */
    },
    breakPoints: {
        lg: {
            'width': '1100px', /* -> @media (max-width: 1100px) */
            'fields': '10px' /* side fields */
        },
        md: {
            'width': '800px',
            'fields': '10px'
        },
        sm: {
            'width': '600px',
            'fields': '10px'
        },
        xs: {
            'width': '400px',
            'fields': '10px'
        }
        /*
        We can create any quantity of break points.

        some_name: {
            some_width: 'Npx',
            some_offset: 'N(px|%)'
        }
        */
    }
};

smartgrid('./frontend/styles', settings);
