package io.github.projectsbyalexander.travnik;

import android.os.Bundle;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Крупный системный шрифт раздувал вёрстку шире экрана: ограничиваем масштаб текста 115 %
        WebSettings s = getBridge().getWebView().getSettings();
        if (s.getTextZoom() > 115) s.setTextZoom(115);
    }

    @Override
    public void onPause() {
        super.onPause();
        // приложение свернули: музыка останавливается
        getBridge().getWebView().evaluateJavascript("window.MUSIC && MUSIC.away()", null);
    }

    @Override
    public void onResume() {
        super.onResume();
        getBridge().getWebView().evaluateJavascript("window.MUSIC && MUSIC.back()", null);
    }
}
