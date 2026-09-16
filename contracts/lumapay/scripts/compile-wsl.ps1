$ErrorActionPreference = 'Stop'

$contractRoot = [System.IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot))
$drive = $contractRoot.Substring(0, 1).ToLowerInvariant()
$relativePath = $contractRoot.Substring(2).Replace('\', '/')
$wslContractRoot = "/mnt/$drive$relativePath"

if (-not $wslContractRoot) {
    throw 'Unable to translate the LumaPay contract path for WSL.'
}

$compileCommand = "cd '$wslContractRoot' && ~/.local/bin/compact compile +0.31.1 src/lumapay.compact src/managed/lumapay"
& wsl.exe --distribution Ubuntu -- bash -lc $compileCommand
exit $LASTEXITCODE
