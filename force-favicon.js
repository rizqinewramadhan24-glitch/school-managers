// force-favicon.js - 100% Force Favicon
(function() {
    console.log('🚀 FORCE-FAVICON LOADED');
    
    // URL favicon
    const FAVICON_URL = 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png';
    
    // Function untuk buat favicon
    function createFavicon() {
        // Hapus semua favicon lama
        const oldIcons = document.querySelectorAll('link[rel*="icon"], link[rel*="apple"], link[rel*="shortcut"]');
        oldIcons.forEach(icon => {
            console.log('Removing old icon:', icon.rel, icon.href);
            icon.parentNode.removeChild(icon);
        });
        
        // Buat array favicon types
        const iconTypes = [
            { rel: 'icon', type: 'image/png' },
            { rel: 'shortcut icon', type: 'image/x-icon' },
            { rel: 'apple-touch-icon', type: 'image/png' },
            { rel: 'apple-touch-icon-precomposed', type: 'image/png' }
        ];
        
        // Buat semua favicon
        iconTypes.forEach(type => {
            const link = document.createElement('link');
            link.rel = type.rel;
            link.href = FAVICON_URL;
            link.type = type.type;
            document.head.appendChild(link);
            console.log('Created:', type.rel);
        });
        
        // Juga coba set dengan DOM API
        try {
            document.querySelector('link[rel="icon"]')?.setAttribute('href', FAVICON_URL);
        } catch(e) {}
        
        console.log('✅ Favicon force complete');
    }
    
    // Eksekusi segera
    createFavicon();
    
    // Eksekusi lagi setelah DOM loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createFavicon);
    }
    
    // Eksekusi lagi setelah 1 detik (paranoid mode)
    setTimeout(createFavicon, 1000);
    
    // Eksekusi lagi setelah 3 detik (super paranoid)
    setTimeout(createFavicon, 3000);
    
    // Monitor perubahan
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const hasFavicon = document.querySelector('link[rel*="icon"]');
                if (!hasFavicon) {
                    console.log('⚠️ Favicon removed, recreating...');
                    createFavicon();
                }
            }
        });
    });
    
    // Observe head changes
    observer.observe(document.head, { childList: true });
    
    // Debug info
    console.log('Favicon URL:', FAVICON_URL);
    console.log('Current icons:', document.querySelectorAll('link[rel*="icon"]').length);
})();