param([int]$Port = 5173, [string]$Root = $null)

# Resolve root to the script's parent's parent (project root), regardless of caller cwd
if (-not $Root) {
  $Root = Split-Path -Parent $PSScriptRoot
}
$Root = (Resolve-Path $Root).ProviderPath

$prefix = "http://localhost:$Port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "[serve.ps1] Root: $Root"
Write-Host "[serve.ps1] Listening on $prefix"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".htm"  = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".ico"  = "image/x-icon"
  ".webp" = "image/webp"
  ".woff" = "font/woff"
  ".woff2"= "font/woff2"
  ".ttf"  = "font/ttf"
  ".map"  = "application/json"
  ".txt"  = "text/plain; charset=utf-8"
  ".pdf"  = "application/pdf"
  ".md"   = "text/markdown; charset=utf-8"
}

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    try {
      $req = $ctx.Request
      $resp = $ctx.Response
      $url = $req.Url.AbsolutePath
      if ($url -eq "/") { $url = "/index.html" }

      # SPA route rewrites
      if ($url -match '^/(es/)?quote/(bundle|auto|home|renters|health)/?$') {
        $url = "/index.html"
      }

      $rel = [Uri]::UnescapeDataString($url).TrimStart("/")
      $path = Join-Path $Root $rel

      Write-Host "[serve] $url -> $path"

      if ((Test-Path -LiteralPath $path -PathType Leaf)) {
        $bytes = [System.IO.File]::ReadAllBytes($path)
        $ext = [System.IO.Path]::GetExtension($path).ToLower()
        $ct = $mime[$ext]
        if (-not $ct) { $ct = "application/octet-stream" }
        $resp.ContentType = $ct
        $resp.ContentLength64 = $bytes.Length
        $resp.StatusCode = 200
        $resp.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host "[serve]   200 $($bytes.Length) bytes $ct"
      } else {
        $resp.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404: $rel not found")
        $resp.ContentType = "text/plain; charset=utf-8"
        $resp.ContentLength64 = $msg.Length
        $resp.OutputStream.Write($msg, 0, $msg.Length)
        Write-Host "[serve]   404 $rel"
      }
    } catch {
      Write-Host "[serve] ERROR: $_"
      try { $ctx.Response.StatusCode = 500 } catch {}
    } finally {
      try { $ctx.Response.OutputStream.Close() } catch {}
    }
  }
} finally {
  $listener.Stop()
}
