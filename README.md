# Electron Forge Release Test

Electron Forge를 이용해 Electron 앱을 실행하고 패키징한 뒤 GitHub Releases에 배포하는 학습용 프로젝트입니다. 앱은 Electron, Chromium, Node.js 버전을 표시하고 preload를 통해 메인 프로세스에 ping을 요청합니다.

## 시작하기

Node.js와 npm을 설치한 다음 프로젝트 루트에서 실행합니다.

```bash
npm install
npm start
```

## 빌드

```bash
npm run package  # 앱 패키징
npm run make     # 현재 운영체제용 배포 파일 생성
```

Forge 설정에는 Windows용 Squirrel, macOS용 ZIP, Linux용 DEB 및 RPM 메이커가 등록되어 있습니다. 메이커와 빌드 환경에 따라 생성 가능한 플랫폼이 달라질 수 있습니다.

## GitHub Releases에 배포

1. `package.json`의 `version`을 아직 사용하지 않은 새 버전으로 변경합니다.
2. `GITHUB_TOKEN` 환경 변수에 대상 저장소에 릴리스를 생성할 수 있는 토큰을 설정합니다.
3. 다음 명령을 실행합니다.

```bash
npm run release
```

Forge는 앱을 빌드하고 설정된 GitHub 저장소에 공개 Release와 배포 파일을 올립니다. 소스 코드를 GitHub에 반영하려면 별도로 커밋하고 푸시해야 합니다. 토큰은 저장소 파일에 기록하지 마세요.

---

문서 작성 지원: GitHub Copilot
