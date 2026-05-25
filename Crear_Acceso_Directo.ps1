# Crea un acceso directo en el Escritorio para JAE Intranet
$WshShell = New-Object -ComObject WScript.Shell

$ShortcutPath = [System.IO.Path]::Combine([Environment]::GetFolderPath("Desktop"), "JAE Intranet.lnk")
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)

$Shortcut.TargetPath  = "C:\Users\Edgar\Desktop\INTRANETJAE\INICIAR_INTRANET.bat"
$Shortcut.WorkingDirectory = "C:\Users\Edgar\Desktop\INTRANETJAE"
$Shortcut.Description = "Iniciar o detener la Intranet JAE (servidor local con acceso Tailscale)"
$Shortcut.WindowStyle = 1   # Normal window

# Intentar usar el ícono de Node/npm si existe, si no usar un ícono del sistema
$NodeIcon = "C:\Program Files\nodejs\node.exe"
if (Test-Path $NodeIcon) {
    $Shortcut.IconLocation = "$NodeIcon,0"
} else {
    $Shortcut.IconLocation = "C:\Windows\System32\cmd.exe,0"
}

$Shortcut.Save()
Write-Host "Acceso directo creado: JAE Intranet.lnk en el Escritorio" -ForegroundColor Green
