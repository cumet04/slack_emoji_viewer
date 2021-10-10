BDIST = backend/dist
FDIST = frontend/dist

all: slack_emoji_viewer

slack_emoji_viewer: $(BDIST)/index.htm $(BDIST)/assets
	cd backend && go build -o ../slack_emoji_viewer .

# Cannot use "index.html" so rename it. refs https://github.com/gin-gonic/gin/issues/2654
backend/dist/index.htm: $(BDIST) $(FDIST)
	cp $(FDIST)/index.html $(BDIST)/index.htm
backend/dist/assets: $(BDIST) $(FDIST)
	cp -r $(FDIST)/assets $(BDIST)/assets
$(BDIST):
	mkdir -p $(BDIST)

$(FDIST): frontend/
	cd frontend && npm run build

clean:
	rm -rf slack_emoji_viewer $(BDIST) $(FDIST)
