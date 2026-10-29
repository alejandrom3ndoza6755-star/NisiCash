# Script para hacer push fácilmente
# Uso: .\push.ps1 "mensaje del commit"

param(
    [Parameter(Mandatory=$false)]
    [string]$Message = "Update"
)

Write-Host "🚀 Iniciando push a GitHub..." -ForegroundColor Cyan

# Add all changes
Write-Host "📦 Agregando cambios..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "💾 Creando commit: $Message" -ForegroundColor Yellow
git commit -m $Message

# Push to both branches
Write-Host "⬆️  Subiendo a GitHub (master y main)..." -ForegroundColor Yellow
git push origin HEAD:master
git push origin HEAD:main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Push exitoso a ambas ramas!" -ForegroundColor Green
} else {
    Write-Host "❌ Error en el push" -ForegroundColor Red
}
