$krishnaB64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes('C:\Users\gotec\Desktop\Listen what Krishna Says\krishna.png'))
$peacockB64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes('C:\Users\gotec\Desktop\Listen what Krishna Says\peacock.png'))
"KRISHNA_B64=$krishnaB64" | Out-File 'C:\Users\gotec\Desktop\Listen what Krishna Says\imgs_b64.txt' -Encoding UTF8
"PEACOCK_B64=$peacockB64" | Out-File 'C:\Users\gotec\Desktop\Listen what Krishna Says\imgs_b64.txt' -Encoding UTF8 -Append
Write-Host "Krishna b64 length: $($krishnaB64.Length)"
Write-Host "Peacock b64 length: $($peacockB64.Length)"
