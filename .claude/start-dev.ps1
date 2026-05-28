$env:PATH = "G:\;" + $env:PATH
Set-Location (Join-Path $PSScriptRoot "..\niag-app")
& "G:\node.exe" "G:\node_modules\npm\bin\npm-cli.js" run dev
