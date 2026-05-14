#!/bin/bash

# ============================================
# AC Website - Production Deployment Checklist
# ============================================
# Run this script before deploying to production
# Usage: bash pre-deploy-check.sh

echo "🔍 Starting Production Pre-Deployment Checks..."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for checks
PASSED=0
FAILED=0
WARNINGS=0

# Helper functions
pass_check() {
  echo -e "${GREEN}✓${NC} $1"
  ((PASSED++))
}

fail_check() {
  echo -e "${RED}✗${NC} $1"
  ((FAILED++))
}

warn_check() {
  echo -e "${YELLOW}⚠${NC} $1"
  ((WARNINGS++))
}

# ============================================
# CHECKS
# ============================================

echo "📋 Environment Variables..."
if [ -f .env.local ]; then
  if grep -q "MONGODB_URI=" .env.local && ! grep -q "your_mongodb" .env.local; then
    pass_check ".env.local exists with valid MONGODB_URI"
  else
    fail_check ".env.local has placeholder MONGODB_URI - update it!"
  fi
else
  fail_check ".env.local not found - copy from .env.example"
fi
echo ""

echo "📦 Dependencies..."
if [ -d node_modules ]; then
  pass_check "node_modules directory exists"
else
  fail_check "node_modules not found - run 'npm install'"
fi
echo ""

echo "🔨 Build Check..."
if npm run build > /dev/null 2>&1; then
  pass_check "Build succeeds without errors"
else
  fail_check "Build failed - check npm run build output"
fi
echo ""

echo "📝 Configuration Files..."
if [ -f next.config.js ]; then
  if grep -q "headers:" next.config.js; then
    pass_check "Security headers configured in next.config.js"
  else
    warn_check "Security headers not found in next.config.js"
  fi
fi

if [ -f tsconfig.json ]; then
  if grep -q '"ignoreDeprecations"' tsconfig.json; then
    pass_check "TypeScript deprecation warnings fixed"
  else
    warn_check "TypeScript ignoreDeprecations not set"
  fi
fi
echo ""

echo "📄 Required Files..."
REQUIRED_FILES=("README.md" ".env.example" ".gitignore" "package.json" "next.config.js" "tsconfig.json")
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    pass_check "$file exists"
  else
    fail_check "$file missing"
  fi
done
echo ""

echo "🌐 SEO Files..."
if [ -f "public/robots.txt" ]; then
  pass_check "robots.txt configured"
else
  warn_check "robots.txt not found in public/"
fi

if [ -f "src/app/sitemap.xml/route.ts" ]; then
  pass_check "Dynamic sitemap configured"
else
  warn_check "Sitemap endpoint not found"
fi
echo ""

echo "📱 UI Components..."
if [ -f "src/components/Header.tsx" ] && [ -f "src/components/Footer.tsx" ]; then
  pass_check "Header and Footer components exist"
else
  fail_check "Header or Footer components missing"
fi
echo ""

# ============================================
# SUMMARY
# ============================================
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║           DEPLOYMENT READINESS SUMMARY                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Passed:${NC}  $PASSED"
echo -e "${RED}Failed:${NC}  $FAILED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✨ ALL CHECKS PASSED - READY FOR DEPLOYMENT! ✨${NC}"
  echo ""
  echo "🚀 Next steps:"
  echo "   1. Verify .env.local has all required variables"
  echo "   2. Test locally: npm run dev"
  echo "   3. Review PRODUCTION_READY.md for deployment options"
  echo "   4. Deploy using your chosen platform"
  exit 0
else
  echo -e "${RED}❌ DEPLOYMENT BLOCKED - FIX ISSUES ABOVE ❌${NC}"
  echo ""
  echo "Please fix the failed checks before deploying."
  exit 1
fi
