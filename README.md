<p align="center">
  <h2 align="center">limgo-action</h3>
  <p align="center">Don't let your test coverage drop</p>
  <p align="center">
    <a href="https://github.com/GoTestTools/limgo-action/releases/latest"><img alt="GitHub release" src="https://img.shields.io/github/release/GoTestTools/limgo-action.svg?logo=github&"></a>
    <a href="https://opensource.org/licenses/MIT"><img alt="unlicense" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
  </p>
</p>

---

This action uses [limgo](https://github.com/GoTestTools/limgo) to enforce test coverage thresholds. 

## Usage

You can use `limgo-action` with the following configuration:

```yaml
jobs:
  build:
    name: Test
    runs-on: ubuntu-latest
    steps:
      # Checkout your project with git
      - name: Checkout
        uses: actions/checkout@v2

      # Install Go on the VM running the action.
      - name: Set up Go
        uses: actions/setup-go@v2
        with:
          go-version: 1.19

      # Run your tests with -coverprofile
      - name: Run tests
        run: |
          go test ./... -coverprofile=test.cov
        
      # Option 1:
      # Run the test coverage check using the limgo-action
      - name: Run test coverage check
        uses: GoTestTools/limgo-action@v1.0.0
        with:
          version: "v0.0.0-beta"
          args: "-coverfile=test.cov -outfile=covcheck.tmp -config=.limgo.json -v=3"
      
      # Option 2:
      # Only install limgo and use it later
      - name: Run test coverage check
        uses: GoTestTools/limgo-action@v1.0.0
        with:
          version: "v0.0.0-beta"
          install-only: true
      
      # Optional: 
      # Upload the coverage check results as artifact
      - name: Upload test coverage results
        uses: actions/upload-artifact@v3
        if: success() || failure()
        with:
          name: test-coverage-results
          path: covcheck.tmp
          if-no-files-found: error
```

For more information about `limgo` please see the [limgo](https://github.com/GoTestTools/limgo) repository.