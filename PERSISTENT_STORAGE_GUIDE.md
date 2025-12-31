# PERSISTENT STORAGE GUIDE
## LocalStorage-Based Portfolio Persistence

---

## 🎉 **PROBLEM SOLVED**

**Before:** Saved portfolios disappeared on page reload  
**Now:** Portfolios are permanently saved in browser storage

---

## 💾 **HOW IT WORKS**

### Browser LocalStorage

Alphatic now uses **localStorage**, a built-in browser feature that:

- ✅ Persists data **permanently** (until manually cleared)
- ✅ Works **offline** (no server needed)
- ✅ Stores data **locally** in your browser
- ✅ Survives browser restarts, computer restarts
- ✅ Unique to each browser/profile

### Storage Location

**Where are portfolios stored?**

- **Chrome:** `~/.config/google-chrome/Default/Local Storage`
- **Firefox:** `~/.mozilla/firefox/[profile]/storage/default`
- **Safari:** `~/Library/Safari/LocalStorage`
- **Edge:** `~/.config/microsoft-edge/Default/Local Storage`

**Important:** Data is stored in the **browser**, not in files next to index.html

### Storage Key

All portfolios are stored under key: `alphatic_saved_portfolios`

Format:
```json
{
  "version": "1.1",
  "lastUpdated": "2024-12-30T19:45:23.000Z",
  "portfolios": [
    {
      "name": "My 60/40",
      "timestamp": "2024-12-30T19:45:23.000Z",
      "holdings": [
        {"symbol": "VOO", "weight": 60},
        {"symbol": "BND", "weight": 40}
      ]
    }
  ]
}
```

---

## 📊 **NEW FEATURES**

### 1. Persistent Save

When you click **"💾 Save Portfolio"**:

```
Before: Saved to memory (lost on reload)
Now: Saved to localStorage (permanent)
```

You'll see confirmation:
```
Portfolio "My 60/40" saved successfully!

💾 Saved to browser storage (persists across sessions)
```

### 2. Export Portfolios

**Export all portfolios to JSON file:**

- Click **"📥 Export"** button in Saved Portfolios panel
- Downloads: `alphatic_portfolios_2024-12-30.json`
- Use for: Backup, sharing, moving between browsers

### 3. Import Portfolios

**Import portfolios from JSON file:**

- Click **"📤 Import"** button
- Choose JSON file
- Choose: **Merge** (add to existing) or **Replace** (delete all, import only these)

### 4. Storage Statistics

**View storage info:**

- Click **"📊 Stats"** button
- Shows:
  - Number of saved portfolios
  - Storage space used (KB)
  - Last updated timestamp

Example output:
```
📊 PORTFOLIO STORAGE STATISTICS

Saved Portfolios: 8
Storage Used: 3.42 KB
Last Updated: 12/30/2024, 7:45:23 PM

Storage Location: Browser localStorage
Persistence: Permanent (until manually cleared)
```

---

## 🔄 **AUTOMATIC MIGRATION**

### First Time Setup

When you open Alphatic V1.1 for the first time:

1. **Checks for localStorage data**
2. **If none found:** Loads sample portfolios from portfolios.js
3. **Saves them to localStorage**
4. **From then on:** All portfolios persist

### Existing Users

If you had V1.0 with in-memory portfolios:

- Those portfolios were lost on reload
- V1.1 starts fresh with samples in localStorage
- You'll need to rebuild or import your old portfolios

---

## 🎯 **USAGE EXAMPLES**

### Example 1: Save a Portfolio

```
1. Build portfolio:
   VOO: 60%, BND: 40%

2. Click "💾 Save Portfolio"

3. Enter name: "Balanced 60/40"

4. Confirmation appears

5. Close browser

6. Reopen index.html

7. Portfolio is still there! ✅
```

### Example 2: Export for Backup

```
1. Click "📥 Export" in Saved Portfolios

2. File downloads: alphatic_portfolios_2024-12-30.json

3. Save to cloud storage (Dropbox, Google Drive, etc.)

4. Now your portfolios are backed up outside browser
```

### Example 3: Import on Different Computer

```
Computer 1:
1. Export portfolios to JSON

Computer 2:
1. Open Alphatic
2. Click "📤 Import"
3. Select JSON file from Computer 1
4. Choose "Replace all"
5. Now both computers have same portfolios
```

### Example 4: Share Portfolio with Colleague

```
1. Export portfolios
2. Email JSON file to colleague
3. They import using "📤 Import"
4. Choose "Merge" to add to their existing portfolios
```

---

## 🛡️ **DATA SAFETY**

### Automatic Saves

Every time you save a portfolio:
- ✅ Validated before saving
- ✅ Error handling if storage full
- ✅ Confirmation message
- ✅ Instant persistence

### Storage Limits

**localStorage has limits:**

- **Chrome/Edge:** 10 MB per domain
- **Firefox:** 10 MB per domain
- **Safari:** 5 MB per domain

**How many portfolios can you save?**

- Average portfolio: ~0.5 KB
- **You can easily save 1,000+ portfolios** before hitting limits
- If you hit the limit, you'll see an error message

### Quota Exceeded Error

If you see:
```
Storage quota exceeded! Too many portfolios saved.
Please delete some old portfolios.
```

**Solutions:**
1. Export portfolios to JSON file (backup)
2. Delete old/unused portfolios
3. Import only essential portfolios

---

## 🔧 **MANAGEMENT**

### View All Portfolios

Saved Portfolios panel shows:
- Portfolio name
- Date saved
- Load button
- Delete button

### Delete Individual Portfolio

1. Click **"Delete"** next to portfolio name
2. Confirm deletion
3. Portfolio removed from localStorage

### Clear All Portfolios

**Not recommended, but if needed:**

```javascript
// Open browser console (F12)
localStorage.removeItem('alphatic_saved_portfolios');
location.reload();
```

This will delete **all** saved portfolios.

### Check Storage Manually

**Browser DevTools:**

1. Press F12
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Expand **Local Storage**
4. Click on `file://` or your domain
5. Look for key: `alphatic_saved_portfolios`
6. See JSON data directly

---

## 🌐 **BROWSER COMPATIBILITY**

### Fully Supported

- ✅ **Chrome** (all versions)
- ✅ **Firefox** (all versions)
- ✅ **Edge** (all versions)
- ✅ **Safari** (all versions)
- ✅ **Opera** (all versions)

### Private/Incognito Mode

**Important:** localStorage is **cleared** when you close private/incognito windows.

If you use Alphatic in private mode:
- ✅ Storage works during session
- ❌ All data is lost when window closes
- 💡 Use Export/Import for persistence in private mode

---

## 📤 **EXPORT/IMPORT DETAILS**

### Export File Format

**File:** `alphatic_portfolios_YYYY-MM-DD.json`

**Contents:**
```json
{
  "version": "1.1",
  "exportDate": "2024-12-30T19:45:23.000Z",
  "portfolios": [
    {
      "name": "Conservative 60/40",
      "timestamp": "2024-12-30T19:45:23.000Z",
      "holdings": [
        {"symbol": "VOO", "weight": 60.00},
        {"symbol": "BND", "weight": 40.00}
      ]
    },
    {
      "name": "Aggressive Growth",
      "timestamp": "2024-12-29T14:23:11.000Z",
      "holdings": [
        {"symbol": "QQQ", "weight": 50.00},
        {"symbol": "VGT", "weight": 30.00},
        {"symbol": "VUG", "weight": 20.00}
      ]
    }
  ]
}
```

### Import Options

**Merge:**
- Adds imported portfolios to existing ones
- No data is deleted
- Useful for combining portfolios from different sources

**Replace:**
- Deletes all existing portfolios
- Imports only the portfolios from file
- Useful for clean sync between computers

---

## 🔒 **PRIVACY & SECURITY**

### Your Data is Private

- ✅ Stored **locally** in your browser
- ✅ **Never** sent to any server
- ✅ **Never** shared with anyone
- ✅ Only accessible on **your** computer + browser

### Data Isolation

Each browser profile is separate:

```
Chrome Profile 1 → Own localStorage
Chrome Profile 2 → Own localStorage
Firefox → Own localStorage
Safari → Own localStorage
```

They **do not** share data.

### Clearing Data

**Your data is deleted when:**
- ❌ You clear browser cache/cookies (manually)
- ❌ You uninstall the browser
- ❌ You clear site data in browser settings
- ❌ You use private/incognito mode (on close)

**Your data is NOT deleted when:**
- ✅ You close the browser
- ✅ You restart your computer
- ✅ You close index.html tab
- ✅ You update Alphatic to new version

---

## 💡 **BEST PRACTICES**

### 1. Regular Exports

**Recommended:**
- Export portfolios **monthly**
- Save to cloud storage (Google Drive, Dropbox)
- Keep multiple backup versions

### 2. Meaningful Names

**Good names:**
- "Conservative Retirement 2024"
- "Growth Q4 2024"
- "60/40 Balanced v2"
- "High Dividend Income"

**Bad names:**
- "Portfolio 1"
- "Test"
- "asdf"
- "New"

### 3. Date Stamping

Alphatic automatically adds timestamps.

When you load a portfolio, you see:
```
Last saved: 12/30/2024, 7:45:23 PM
```

Use this to track portfolio versions.

### 4. Version Control

Save multiple versions:
```
"Balanced 60/40 v1" - Original
"Balanced 60/40 v2" - After first optimization
"Balanced 60/40 v3" - After regime adjustment
```

### 5. Backup Before Major Changes

Before upgrading browser or OS:
1. Export all portfolios
2. Save JSON file to safe location
3. After upgrade, import back

---

## 🐛 **TROUBLESHOOTING**

### Portfolios Not Persisting

**Check:**
1. Are you in private/incognito mode?
2. Does browser support localStorage?
3. Is localStorage enabled in browser settings?
4. Are you clearing browser data on exit?

**Solution:**
- Use normal (non-private) mode
- Check browser settings for localStorage
- Export portfolios as backup

### Cannot Save Portfolio

**Error:** "Storage quota exceeded"

**Solution:**
1. Export portfolios (backup)
2. Delete old portfolios
3. Try saving again

### Import Not Working

**Check:**
1. Is file valid JSON?
2. Is file from Alphatic export?
3. Is file corrupted?

**Solution:**
- Use only files exported by Alphatic
- Don't manually edit JSON files
- Re-export if file seems corrupted

### Storage Stats Show 0 Portfolios

**But you saved some?**

**Possible causes:**
1. Browser cleared localStorage
2. Using different browser/profile
3. localStorage disabled

**Solution:**
- Import from backup JSON file
- Re-save portfolios

---

## 📱 **CROSS-DEVICE SYNC**

### localStorage Does NOT Sync

Important: localStorage is **local** to each browser.

**Not synced between:**
- ❌ Different computers
- ❌ Different browsers on same computer
- ❌ Different browser profiles

### Manual Sync Method

To sync between devices:

**Device 1:**
1. Export portfolios to JSON

**Transfer:**
2. Email file to yourself
3. Or use cloud storage
4. Or USB drive

**Device 2:**
5. Import JSON file

### Cloud Storage Workflow

**Recommended for multiple devices:**

1. Export portfolios weekly
2. Save to Dropbox/Google Drive
3. On other devices, import latest JSON
4. Overwrite local with latest version

---

## 🎓 **TECHNICAL DETAILS**

### Storage API Used

```javascript
// Save
localStorage.setItem('alphatic_saved_portfolios', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('alphatic_saved_portfolios'));

// Delete
localStorage.removeItem('alphatic_saved_portfolios');
```

### Data Structure

```javascript
{
  version: "1.1",
  lastUpdated: "2024-12-30T19:45:23.000Z",
  portfolios: [
    {
      name: "Portfolio Name",
      timestamp: "2024-12-30T19:45:23.000Z",
      holdings: [
        { symbol: "VOO", weight: 60.00 },
        { symbol: "BND", weight: 40.00 }
      ]
    }
  ]
}
```

### Size Calculation

Each portfolio averages:
- Name: ~20 bytes
- Timestamp: ~30 bytes
- Holdings: ~50 bytes per holding
- **Total: ~200-500 bytes per portfolio**

With 10 MB limit:
- **Theoretical max: ~20,000 portfolios**
- **Practical max: ~5,000-10,000 portfolios**

You'll never hit this limit in normal use.

---

## ✅ **SUMMARY**

### What Changed

**V1.0:**
- ❌ Portfolios in memory only
- ❌ Lost on reload
- ❌ No persistence

**V1.1:**
- ✅ Portfolios in localStorage
- ✅ Persist across sessions
- ✅ Export/import capability
- ✅ Storage statistics
- ✅ Automatic migration

### Key Benefits

1. **Never lose portfolios again**
2. **Export for backup**
3. **Import to share/sync**
4. **View storage stats**
5. **Automatic saves**

### Quick Reference

**Save:** Build portfolio → Click "💾 Save"  
**Export:** Click "📥 Export" in Saved Portfolios panel  
**Import:** Click "📤 Import" → Choose file  
**Stats:** Click "📊 Stats"  
**Delete:** Click "Delete" next to portfolio name  

---

**Your portfolios are now safe! 💾**

*Last Updated: December 30, 2024*
