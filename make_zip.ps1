$ErrorActionPreference = 'Stop'
$src = $PSScriptRoot
$dest = Join-Path (Split-Path $src -Parent) 'stepup-for-sdg.zip'
if (Test-Path $dest) { Remove-Item $dest -Force }

$exclude = @('node_modules', '.next', '.git')
$items = Get-ChildItem -Path $src -Force | Where-Object { $exclude -notcontains $_.Name }

Compress-Archive -Path $items.FullName -DestinationPath $dest -CompressionLevel Optimal -Force
$size = (Get-Item $dest).Length / 1MB
Write-Output ("Created: {0}" -f $dest)
Write-Output ("Size: {0:N2} MB" -f $size)
