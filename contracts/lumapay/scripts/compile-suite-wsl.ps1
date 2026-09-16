$ErrorActionPreference = 'Stop'

$contractRoot = [System.IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot))
$drive = $contractRoot.Substring(0, 1).ToLowerInvariant()
$relativePath = $contractRoot.Substring(2).Replace('\', '/')
$wslContractRoot = "/mnt/$drive$relativePath"
$modules = @('campaigns', 'gift-cards', 'quote-checkout', 'backup-anchor', 'card-vault')

foreach ($module in $modules) {
    $compileCommand = "cd '$wslContractRoot' && ~/.local/bin/compact compile +0.31.1 src/lumapay-$module.compact src/managed/lumapay-$module"
    & wsl.exe --distribution Ubuntu -- bash -lc $compileCommand
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
