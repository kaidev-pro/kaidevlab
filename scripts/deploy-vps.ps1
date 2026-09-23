Write-Host "Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Aborting deploy." -ForegroundColor Red
    exit 1
}

Write-Host "Creating archive out.tar.gz..." -ForegroundColor Cyan
tar.exe -czf out.tar.gz -C out .
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to create archive!" -ForegroundColor Red
    exit 1
}

$vpsIp = "187.77.142.198"
Write-Host "Uploading to VPS ($vpsIp)..." -ForegroundColor Cyan
scp -o BatchMode=yes .\out.tar.gz root@${vpsIp}:/tmp/out.tar.gz
if ($LASTEXITCODE -ne 0) {
    Write-Host "Upload failed!" -ForegroundColor Red
    Remove-Item .\out.tar.gz -Force -ErrorAction SilentlyContinue
    exit 1
}

Write-Host "Extracting and reloading Nginx on VPS..." -ForegroundColor Cyan
ssh -o BatchMode=yes root@${vpsIp} "tar -xzf /tmp/out.tar.gz -C /var/www/kaidevlab/out/ && chown -R www-data:www-data /var/www/kaidevlab/out && systemctl reload nginx && rm /tmp/out.tar.gz"

Remove-Item .\out.tar.gz -Force -ErrorAction SilentlyContinue

Write-Host "Deploy to VPS successfully finished! Kaidevlab is live." -ForegroundColor Green
