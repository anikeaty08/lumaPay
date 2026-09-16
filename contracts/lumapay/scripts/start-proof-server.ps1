$ErrorActionPreference = 'Stop'

$containerName = 'lumapay-midnight-proof-server'
$image = 'midnightntwrk/proof-server:8.1.0'

$existing = docker ps -a --filter "name=^/$containerName$" --format '{{.Status}}'
if ($existing) {
    $running = docker ps --filter "name=^/$containerName$" --format '{{.Status}}'
    if (-not $running) {
        docker start $containerName | Out-Null
    }
} else {
    docker run -d --name $containerName -p 6300:6300 $image midnight-proof-server -v | Out-Null
}

$deadline = (Get-Date).AddMinutes(5)
do {
    try {
        $health = Invoke-RestMethod -Uri 'http://127.0.0.1:6300/health' -TimeoutSec 5
        if ($health.status -eq 'ok') {
            $version = Invoke-RestMethod -Uri 'http://127.0.0.1:6300/version' -TimeoutSec 5
            Write-Output "LumaPay proof server is ready (version $version)."
            exit 0
        }
    } catch {
        Start-Sleep -Seconds 3
    }
} while ((Get-Date) -lt $deadline)

docker logs --tail 30 $containerName
throw 'Proof server did not become healthy within five minutes.'
