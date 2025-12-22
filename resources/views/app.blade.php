<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <link rel="icon" type="image/png" href="/favicon.png">
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>