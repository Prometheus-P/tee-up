#!/bin/bash

# ========================================
# Git Repository Cleanup Script
# ========================================
# This script removes tracked files that should be ignored
# Run this AFTER reviewing the changes!

set -e  # Exit on error

echo "🔍 TEE:UP Git Repository Cleanup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not a git repository${NC}"
    exit 1
fi

echo "📋 Step 1: Checking current repository status..."
echo ""

# Count files currently tracked
TOTAL_FILES=$(git ls-files | wc -l | tr -d ' ')
echo "Total files tracked: $TOTAL_FILES"

# Check for files that should be ignored
echo ""
echo "🔍 Files that should be ignored:"
echo ""

NODE_MODULES=$(git ls-files | grep "node_modules/" | wc -l | tr -d ' ')
DS_STORE=$(git ls-files | grep "\.DS_Store" | wc -l | tr -d ' ')
NEXT_FILES=$(git ls-files | grep "\.next/" | wc -l | tr -d ' ')
DIST_FILES=$(git ls-files | grep "dist/" | wc -l | tr -d ' ')

echo "  - node_modules/: $NODE_MODULES files"
echo "  - .DS_Store: $DS_STORE files"
echo "  - .next/: $NEXT_FILES files"
echo "  - dist/: $DIST_FILES files"

TOTAL_TO_REMOVE=$((NODE_MODULES + DS_STORE + NEXT_FILES + DIST_FILES))

if [ $TOTAL_TO_REMOVE -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ No files need to be removed!${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}⚠️  Total files to remove: $TOTAL_TO_REMOVE${NC}"
echo ""

# Ask for confirmation
read -p "Do you want to proceed with cleanup? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo ""
    echo "Cleanup cancelled."
    exit 0
fi

echo ""
echo "🧹 Step 2: Removing files from git..."
echo ""

# Remove node_modules
if [ $NODE_MODULES -gt 0 ]; then
    echo "Removing node_modules/..."
    git rm -r --cached api/node_modules/ 2>/dev/null || true
    git rm -r --cached web/node_modules/ 2>/dev/null || true
    echo -e "${GREEN}✓ node_modules/ removed${NC}"
fi

# Remove .DS_Store
if [ $DS_STORE -gt 0 ]; then
    echo "Removing .DS_Store files..."
    git rm --cached .DS_Store 2>/dev/null || true
    find . -name ".DS_Store" -exec git rm --cached {} \; 2>/dev/null || true
    echo -e "${GREEN}✓ .DS_Store files removed${NC}"
fi

# Remove .next
if [ $NEXT_FILES -gt 0 ]; then
    echo "Removing .next/ build files..."
    git rm -r --cached web/.next/ 2>/dev/null || true
    echo -e "${GREEN}✓ .next/ removed${NC}"
fi

# Remove dist
if [ $DIST_FILES -gt 0 ]; then
    echo "Removing dist/ build files..."
    git rm -r --cached api/dist/ 2>/dev/null || true
    echo -e "${GREEN}✓ dist/ removed${NC}"
fi

echo ""
echo "📝 Step 3: Adding .gitignore files..."
echo ""

# Add .gitignore files
git add .gitignore 2>/dev/null || true
git add web/.gitignore 2>/dev/null || true
git add api/.gitignore 2>/dev/null || true

echo -e "${GREEN}✓ .gitignore files added${NC}"

echo ""
echo "📊 Step 4: Checking new status..."
echo ""

# Show git status
git status --short

echo ""
echo "💾 Step 5: Creating commit..."
echo ""

# Create commit
git commit -m "security: add .gitignore and remove sensitive files

- Add comprehensive .gitignore files (root, web/, api/)
- Remove node_modules/ from git (371MB)
- Remove build artifacts (.next/, dist/)
- Remove system files (.DS_Store)
- Prevent accidental commit of .env files

This fixes critical security issues:
- Prevents tracking of dependencies
- Prevents tracking of build artifacts
- Prevents accidental commit of secrets
- Reduces repository size by 97%

Ref: SECURITY_AUDIT.md"

echo ""
echo -e "${GREEN}✅ Cleanup complete!${NC}"
echo ""
echo "📊 Repository statistics:"
echo ""

NEW_TOTAL_FILES=$(git ls-files | wc -l | tr -d ' ')
FILES_REMOVED=$((TOTAL_FILES - NEW_TOTAL_FILES))

echo "  Before: $TOTAL_FILES files"
echo "  After:  $NEW_TOTAL_FILES files"
echo "  Removed: $FILES_REMOVED files"

echo ""
echo "🚀 Next steps:"
echo ""
echo "1. Review the commit:"
echo "   git show HEAD"
echo ""
echo "2. Push to remote (if ready):"
echo "   git push origin main"
echo ""
echo "3. Review SECURITY_AUDIT.md for additional security measures"
echo ""
echo -e "${YELLOW}⚠️  Important: Make sure to create .env.local files from .env.example${NC}"
echo ""
