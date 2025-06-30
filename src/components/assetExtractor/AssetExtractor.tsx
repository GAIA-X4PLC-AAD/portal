import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Header from '../../common/components/header/Header';
import Main from '../../common/components/layouts/Main';
import { AssetExtractorService } from '../../services/assetExtractorService';

const AssetExtractor: FC = () => {
  const { t } = useTranslation();
  const [assetFile, setAssetFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [licenseURL, setLicenseURL] = useState('');
  const [licenseType, setLicenseType] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!assetFile) {
      alert('Bitte wähle eine Asset-Datei aus.');
      return;
    }

    const formData = new FormData();
    formData.append('Asset', assetFile);
    if (licenseFile) {
      formData.append('License', licenseFile);
    }
    if (licenseURL.trim() !== '') {
      formData.append('LicenseURL', licenseURL.trim());
    }
    if (licenseType.trim() !== '') {
      formData.append('selectedLicenseType', licenseType.trim());
    }

    try {
      await AssetExtractorService.submitAsset(formData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header title={t('left-menu.assetExtractor')}/>
      <Main>
        <div className="asset-extractor-form">
          <h2>Asset extrahieren</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Asset-Datei (PDF, CSV, etc.):</label>
              <input type="file" accept=".pdf,.csv,.json,.txt" onChange={(e) => setAssetFile(e.target.files?.[0] || null)} required />
            </div>

            <div>
              <label>Lizenzdatei (optional):</label>
              <input type="file" onChange={(e) => setLicenseFile(e.target.files?.[0] || null)} />
            </div>

            <div>
              <label>Lizenz-URL (optional):</label>
              <input type="url" value={licenseURL} onChange={(e) => setLicenseURL(e.target.value)} />
            </div>

            <div>
              <label>Lizenztyp (frei eintragen):</label>
              <input
                type="text"
                value={licenseType}
                onChange={(e) => setLicenseType(e.target.value)}
                placeholder="z.B. MIT, Apache-2.0, ... (optional)"
              />
            </div>

            <button type="submit">Extrahieren</button>
          </form>
        </div>
      </Main>
    </>
  );
};

export default AssetExtractor;
